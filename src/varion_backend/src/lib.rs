use candid::{CandidType, Deserialize}; 
use ic_cdk::update;
use prost::Message;
use tract_ndarray::Array2;
use tract_onnx::prelude::*;
use getrandom::register_custom_getrandom;

#[derive(CandidType, Deserialize)]
struct PredictionFailed {
    message: String,
}

#[derive(CandidType, Deserialize)]
enum PredictionResult {
    Success(String),
    Failure(PredictionFailed),
}
pub fn custom_getrandom(_buf: &mut [u8]) -> Result<(), getrandom::Error> {
    Err(getrandom::Error::UNSUPPORTED)
}
register_custom_getrandom!(custom_getrandom);

const MODEL: &'static [u8] = include_bytes!("model.onnx");

fn parse_csv_content(csv_content: &str) -> TractResult<Tensor> {
    let mean = vec![92.56008643, 104.46793431, 96.76034648, 24.68794296, 37.15878695];
    let std = vec![9.06523052, 21.02784219, 1.69851249, 9.43523536, 0.66558528];

    let rows: Vec<Vec<f32>> = csv_content
        .lines()
        .map(|line| {
            line.split(',')
                .map(|s| s.parse::<f32>().unwrap())
                .collect()
        })
        .collect();

    let shape = (rows.len(), rows[0].len());
    let mut array = Array2::from_shape_vec(shape, rows.into_iter().flatten().collect())?;

    // Apply standard scaling
    for (_i, mut row) in array.outer_iter_mut().enumerate() {
        for (j, elem) in row.iter_mut().enumerate() {
            *elem = (*elem - mean[j]) / std[j];
        }
    }

    Ok(Tensor::from(array))
}

fn predict(csv_content: &str) -> TractResult<String> {
    let bytes = bytes::Bytes::from_static(MODEL);
    let proto: tract_onnx::pb::ModelProto = tract_onnx::pb::ModelProto::decode(bytes)?;
    let model = tract_onnx::onnx()
        .model_for_proto_model(&proto)?
        .into_optimized()?
        .into_runnable()?;

    // Parse CSV content into a tensor
    let tensor = parse_csv_content(csv_content)?;

    // Run the model with the parsed tensor
    let output = model.run(tvec!(tensor.into()))?;

    let output_tensor = output[0].to_array_view::<f32>()?;
    let output_vector: Vec<f32> = output_tensor.iter().cloned().collect();
    let output_string = output_vector.iter()
        .map(|v| v.to_string())
        .collect::<Vec<String>>()
        .join(",");

    println!("{}", output_string);
    Ok(output_string.to_string())
}

#[update]
async fn prediction_result(csv_content: String) -> PredictionResult {
    if csv_content.is_empty() {
        PredictionResult::Failure(PredictionFailed {
            message: "Invalid input: CSV content is empty".to_string(),
        })
    } else {
        match predict(&csv_content) {
            Ok(predictions) => PredictionResult::Success(predictions),
            Err(e) => PredictionResult::Failure(PredictionFailed {
                message: format!("Prediction failed: {}", e),
            }),
        }
    }
}