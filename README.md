# Varion AI

<p align="center"><img width="628" height="150" src="src/varion_frontend/public/varionlogo.png"></p>

## Overview

Varion AI is a decentralized healthcare monitoring system designed to optimize hospital operations through artificial intelligence. By continuously monitoring patient health data, Varion AI leverages a decentralized machine learning model to assess the risk of cardiac arrest, ensuring data integrity and security. 

Powered by the Internet Computer Protocol, Varion AI provides a secure, scalable, and decentralized infrastructure, seamlessly integrating with centralized infrastructure to bridge between Web2 and Web3 data.


## Features

- **Cardiovascular Disease Prediction**: Utilizes DeAI to analyze patient data and predict heart-related risks by evaluating metrics such as heart rate, blood pressure, oxygen saturation, respiratory rate, and temperature. This helps identify high-risk patients for timely interventions, reducing cardiovascular morbidity and mortality rates.
- **Real-Time Monitoring Dashboard**: The user-friendly dashboard allows healthcare professionals to view and analyze patient data in real-time. It includes features like risk level filtering, patient search, and data sorting by cardiac probability, ensuring that critical information is always at the fingertips of medical staff.
- **Patient Management Strategies**: This feature allows healthcare professionals to easily search, filter, and sort patient data based on various criteria. Users can search for patients by ID, filter patients by risk level, and sort patients by cardiac probability. The feature provides real-time updates and visual indicators to help identify high-risk patients at a glance.
- **On-Chain Inference**: Run machine learning models on a decentralized platform, leveraging the unique capabilities of DeAI on the Internet Computer.


## Getting Started

This section guides you through the initial setup of the necessary tools and environments for this project. We are using Rust with WebAssembly and the Dfinity platform.

### Rust Setup

First, ensure you have Rust installed. We will then set the default toolchain to stable and add the WebAssembly target.

1. Install Rust and Cargo (if not already installed): Visit [Rust's installation page](https://www.rust-lang.org/tools/install).
2. Set the default toolchain to stable:
   ```bash
   rustup default stable
   ```
3. Add the WebAssembly target:
   ```bash
   rustup target add wasm32-unknown-unknown
   ```

### Node Package Installation
Next, ensures that the project has all the necessary libraries and tools to run or build the application.
```bash
npm install
```

### Dfinity's DFX Setup

We will be using Dfinity's `dfx` for our development environment.

1. Install Dfinity's `dfx`: Follow the instructions on [Dfinity's SDK documentation](https://sdk.dfinity.org/docs/quickstart/quickstart.html).
2. Starts the replica, running in the background:
   ```bash
   dfx start --background
   ```
3. Deploys your canisters to the replica and generates your candid interface:
   ```bash
   dfx deploy
   ```

### Start the Development Server
If you are making frontend changes, you can start a development server.
```bash
npm start
```

## Varion's User Manual
Once deployment is complete, check out Varion's User Manual for a comprehensive guide on how to fully utilize the application at [Varion Gitbook](https://varion.gitbook.io/varion-ai-documentation).

## License

Apache 2.0/MIT
All original work licensed under either of

Apache License, Version 2.0 (LICENSE-APACHE or http://www.apache.org/licenses/LICENSE-2.0)
MIT license (LICENSE-MIT or http://opensource.org/licenses/MIT) at your option.