import React, { useState, useEffect , useRef} from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence} from 'framer-motion';
import Patients from './patients';
import { FiHome, FiHeart, FiLogOut, FiAlertCircle } from 'react-icons/fi';
import { useConnect } from "@connect2ic/react";
import { varion_backend } from 'declarations/varion_backend';
import { ResponsiveBar } from '@nivo/bar';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f2f5;
  font-family: 'Poppins', sans-serif;
`;

const Sidebar = styled(motion.div)`
  background: linear-gradient(359.3deg, rgb(196, 214, 252) 1%, rgba(187, 187, 187, 0) 70.9%);
  color: #333;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Logo = styled(motion.div)`
  padding: 30px 20px;
  text-align: center;
  margin-bottom: 30px;
  overflow: hidden;
`;

const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

const NavItem = styled(motion.li)`
  padding: 20px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #4b5563;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    background: rgba(79, 70, 229, 0.1);
    color: #4f46e5;
  }
`;

const Icon = styled.span`
  font-size: 24px;
  min-width: 24px;
  text-align: center;
`;

const Label = styled(motion.span)`
  margin-left: 15px;
  white-space: nowrap;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 40px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const DashboardContent = styled.div`
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChartContainer = styled.div`
  height: 400px;
  margin-bottom: 30px;
  background: #f8fafc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h2`
  font-size: 24px;
  color: #2d3748;
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  background: #edf2f7;
  padding: 30px;
  border-radius: 10px;

  p {
    margin: 10px 0 5px;
  }
`;

const InstructionText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const StyledInput = styled.input`
  padding: 12px 24px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  width: calc(100% - 48px);
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const StyledButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  width: 100%;

  &:hover {
    background-color: #4338ca;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const StyledStartButton = styled.button`
  background-color: #f54b9e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  &:hover {
    background-color: #f7288d;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const ConfirmButton = styled(StyledButton)`
  width: 85%;
`;

const CancelButton = styled(StyledButton)`
  background-color: #ef4444;
  margin-left: 10px;
  width: 15%;

  &:hover {
    background-color: #dc2626;
  }
`;

const ExampleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 2px solid #cbd5e0; /* Darker border for better visibility */
`;

const TableHeader = styled.th`
  border: 1px solid #cbd5e0; /* Darker border for better visibility */
  padding: 8px;
  background-color: #edf2f7;
  text-align: left;
  width: 16.66%;
`;

const TableCell = styled.td`
  border: 1px solid #cbd5e0; /* Darker border for better visibility */
  padding: 8px;
  width: 16.66%;
`;

const TableNotes = styled.p`
  color: #849398; /* Lighter gray color */
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 0;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;

  p {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
  }
`;

const ErrorIcon = styled(FiAlertCircle)`
  color: #ef4444;
  font-size: 48px;
  margin-bottom: 10px;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4338ca;
  }
`;

const NoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  color: #718096;
  font-weight: 500;
`;

const maskToken = (token) => {
  if (token.length <= 10) {
    return ''; //
  }
  const end = token.slice(-4); // Show the last 4 characters
  const masked = '********'; // Use a fixed number of asterisks
  return `${masked}${end}`;
};

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { disconnect } = useConnect();
  const [chartData, setChartData] = useState([{}]);
  const [link, setLink] = useState('');
  const [token, setToken] = useState('');
  const [modalError, setModalError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [originalLink, setOriginalLink] = useState('');
  const [originalToken, setOriginalToken] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const maskedToken = maskToken(token);
  const intervalRef = useRef(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [patientData, setPatientData] = useState([]);
  useEffect(() => {
    const now = new Date();
    setChartData([]);
  }, []);

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 },
  };

  const labelVariants = {
    expanded: { opacity: 1, display: 'block' },
    collapsed: { opacity: 0, display: 'none' },
  };

  const riskColors = {
    "Low Risk": "#56f589",  // Green
    "Medium Risk": "#ffed72",  // Yellow
    "High Risk": "#ff7272"  // Red
  };

  const getRiskLevel = (value) => {
    if (value < 0.5) return "Low Risk";
    if (value < 0.75) return "Medium Risk";
    return "High Risk";
  };

  const closeModal = () => {
    setModalError(null);
  };

  const validateApiResponse = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return false;
    }
  
    const requiredFields = ['HR', 'BP', 'SpO2', 'RESP', 'TEMP', 'Patient_ID'];
    for (const row of data) {
      for (const field of requiredFields) {
        if (!row.hasOwnProperty(field) || row[field] === '') {
          return false;
        }
      }
    }
    return true;
  };

  const validateInputs = () => {
    if (!link || !token) {
      setModalError('Please enter both the link and Authorization Bearer token.');
      return false;
    }
  
    const urlPattern = /^https:\/\/sheetdb\.io\/api\/v1\/([\w\-]+)\/?$/;
    if (!urlPattern.test(link)) {
      setModalError('Please enter a valid sheetdb.io link.');
      return false;
    }
  
    // Create the curl request string for logging purposes
    const curlCommand = `curl -H "Authorization: Bearer ${token}" ${link}`;
    console.log('Curl command:', curlCommand);
  
    // Make the actual API request
    fetch(link, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data);
      if (!validateApiResponse(data)) {
        setModalError('The data is missing required fields. Please ensure all rows contain HR, BP, SpO2, RESP, TEMP, and Patient_ID.');
        setLink('');
        setToken('');
        setIsSubmitted(false);
        return false;
      }
      // Handle the API response here (throw to smart contract)
      return true;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setModalError('An error occurred while fetching data. Please check your link and token.');
      setLink('');
      setToken('');
      setIsSubmitted(false);
      return false;
    });
  
    return true;
  };

  const fetchData = () => {
    console.log('Fetching data...');
    return fetch(link, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data);
      
      // Validate the data
      if (!validateApiResponse(data)) {
        setLink('');
        setToken('');
        setIsSubmitted(false);
        throw new Error('Some of the data is missing required fields or is empty.')
      }
  
      const formattedData = data.map(row => 
        `${row.HR},${row.BP},${row.SpO2},${row.RESP},${row.TEMP}`).join('\n');
  
      console.log('Formatted data:', formattedData);
  
      // Only proceed if the data is valid
      return varion_backend.prediction_result(formattedData)
        .then(result => {
          console.log('ML Model Prediction Result:', result);
          return { data, result };
        });
    })
    .then(({ data, result }) => {
      if (!data || !result || !result.Success) {
        throw new Error('Invalid response from ML model');
      }
  
      const predictionValues = result.Success.split(',').map(Number);
      const processedPatientData = data.map((row, index) => ({
        id: row.Patient_ID,
        HR: row.HR,
        BP: row.BP,
        SpO2: row.SpO2,
        RESP: row.RESP,
        TEMP: row.TEMP,
        riskLevel: getRiskLevel(predictionValues[index]),
        cardiacProba: predictionValues[index],
        lastUpdated: formatTime(new Date())
      }));
      setPatientData(processedPatientData);
      const now = new Date();
  
      const riskLevels = {
        "Low Risk": 0,
        "Medium Risk": 0,
        "High Risk": 0
      };
  
      predictionValues.forEach(value => {
        const riskLevel = getRiskLevel(value);
        riskLevels[riskLevel]++;
      });
  
      setChartData([
        { id: "Risk Levels", data: [
          { x: "Low Risk", Patients: riskLevels["Low Risk"] },
          { x: "Medium Risk", Patients: riskLevels["Medium Risk"] },
          { x: "High Risk", Patients: riskLevels["High Risk"] }
        ]}
      ]);
      setLastUpdateTime(now);
    })
    
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      setModalError(`An error occurred: ${error.message}`);
      // Stop the interval if there's an error
      setIsRunning(false);
      clearInterval(intervalRef.current);
    });
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      console.log('Starting the process');
      fetchData().then(() => {
        intervalRef.current = setInterval(fetchData, 10000); // Fetch every 60 seconds
      });
    } else {
      console.log('Stopping the process');
      clearInterval(intervalRef.current);
    }
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      console.log('Link submitted:', link);
      console.log('Token submitted:', token);
      setIsSubmitted(true);
    }
  };

  const handleEdit = () => {
    setOriginalLink(link);
    setOriginalToken(token);
    setIsEditing(true);
  };

  const handleConfirm = () => {
    if (validateInputs()) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setLink(originalLink);
    setToken(originalToken);
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    if (isSigningOut) return; 
    setIsSigningOut(true);
    try {
      await disconnect();
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return (
          <DashboardContent>
            <ChartHeader>
              <ChartTitle>Real-time Patient Data Monitoring Dashboard</ChartTitle>
            </ChartHeader>
            <ChartContainer>
              {lastUpdateTime && (
                <p style={{ textAlign: 'right', marginBottom: '10px' }}>
                  Last updated: {formatTime(lastUpdateTime)}
                </p>
              )}
              {chartData[0]?.data && chartData[0].data.length > 0 ? (
                <ResponsiveBar
                  data={chartData[0].data}
                  keys={['Patients']}
                  indexBy="x"
                  margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={({ id, data }) => riskColors[data.x]}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Cardiac Risk Level',
                    legendPosition: 'middle',
                    legendOffset: 40
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Patient Count',
                    legendPosition: 'middle',
                    legendOffset: -40
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  label={d => `${d.value}`}
                />
              ) : (
                <NoDataMessage>Data not available</NoDataMessage>
              )}
            </ChartContainer>
            <InputContainer>
              {isSubmitted && !isEditing ? (
                <>
                  <InstructionText>Currently streaming data from:</InstructionText>
                  <p>Link: {link}</p>
                  <p>Token: {maskedToken}</p>
                  <StyledButton onClick={handleEdit}>Edit</StyledButton>
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <StyledStartButton onClick={handleStartStop}>
                      {isRunning ? 'Stop ML Model' : 'Start ML Model'}
                    </StyledStartButton>
                  </div>
                </>
              ) : (
                <>
                  <InstructionText>Please provide a sheetdb.io link and its authorization bearer token to access the Spreadsheet file:</InstructionText>
                  <StyledInput
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter link"
                  />
                  <StyledInput
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter token"
                  />
                  {isEditing ? (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
                      <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                    </div>
                  ) : (
                    <StyledButton 
                      onClick={handleSubmit}
                      disabled={!link || !token}
                    >
                      Submit
                    </StyledButton>
                  )}
                  {(!isSubmitted || isEditing) && (
                    <>
                      <p>Please ensure your Spreadsheet file follows this template:</p>
                      <ExampleTable>
                        <thead>
                          <tr>
                            <TableHeader>HR</TableHeader>
                            <TableHeader>BP</TableHeader>
                            <TableHeader>SpO2</TableHeader>
                            <TableHeader>RESP</TableHeader>
                            <TableHeader>TEMP</TableHeader>
                            <TableHeader>Patient_ID</TableHeader>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <TableCell>72</TableCell>
                            <TableCell>120</TableCell>
                            <TableCell>98</TableCell>
                            <TableCell>16</TableCell>
                            <TableCell>36.5</TableCell>
                            <TableCell>101</TableCell>
                          </tr>
                          <tr>
                            <TableCell>75</TableCell>
                            <TableCell>118</TableCell>
                            <TableCell>97</TableCell>
                            <TableCell>18</TableCell>
                            <TableCell>36.7</TableCell>
                            <TableCell>102</TableCell>
                          </tr>
                          <tr>
                            <TableCell>...</TableCell>
                            <TableCell>...</TableCell>
                            <TableCell>...</TableCell>
                            <TableCell>...</TableCell>
                            <TableCell>...</TableCell>
                            <TableCell>...</TableCell>
                          </tr>
                        </tbody>
                      </ExampleTable>
                      <TableNotes>HR: Heart Rate, BP: Systolic Blood Pressure, SpO2: Oxygen Saturation, RESP: Respiration Rate, TEMP: Temperature</TableNotes>
                    </>
                  )}
                </>
              )}
            </InputContainer>
          </DashboardContent>
        );
        case 'patients':
          return <Patients patientData={patientData}/>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
      <Logo>
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.img
              key="expanded"
              src="/varionlogo.png"
              alt="Varion Logo"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: 'auto', marginTop: '10px', marginRight: '30px'}}
            />
          ) : (
            <motion.img
              key="collapsed"
              src="/varionlogoOnly.png"
              alt="Varion Icon"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 30 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: 'auto', marginTop: '10px' }}
            />
          )}
        </AnimatePresence>
      </Logo>
        <Nav>
          <ul>
            <NavItem onClick={() => setActiveComponent('dashboard')}>
              <Icon><FiHome /></Icon>
              <Label variants={labelVariants}>Dashboard</Label>
            </NavItem>
            <NavItem onClick={() => setActiveComponent('patients')}>
              <Icon><FiHeart /></Icon>
              <Label variants={labelVariants}>Patients</Label>
            </NavItem>
            <NavItem onClick={handleSignOut}>
              <Icon><FiLogOut /></Icon>
              <Label variants={labelVariants}>Sign Out</Label>
            </NavItem>
          </ul>
        </Nav>
      </Sidebar>
      <MainContent>
        {renderComponent()}
      </MainContent>
      {modalError && (
        <Modal>
          <ModalContent>
            <ErrorIcon />
            <p>{modalError}</p>
            <ModalButton onClick={closeModal}>Got it</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;