import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiRefreshCw } from 'react-icons/fi';

const PatientsContainer = styled.div`
  padding: 30px;
  background: #f8fafc;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #2d3748;
  margin: 0 0 20px 0;
`;

const SearchAndRefresh = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  margin-left: 8px;
  width: 200px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

const GridHeader = styled.div`
  font-weight: bold;
  color: #4a5568;
  padding: 12px;
  background: #edf2f7;
  border-radius: 6px;
  text-align: center;
`;

const GridItem = styled(motion.div)`
  padding: 12px;
  background: ${props => props.riskColor || '#f7fafc'};
  border-radius: 6px;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #edf2f7;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#4f46e5' : 'white'};
  color: ${props => props.active ? 'white' : '#4f46e5'};
  border: 1px solid #4f46e5;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.active ? '#4338ca' : '#edf2f7'};
  }
`;

const getRiskColor = (riskLevel) => {
  switch (riskLevel) {
    case 'High Risk': return 'rgba(244, 67, 54, 0.1)';
    case 'Medium Risk': return 'rgba(255, 235, 59, 0.1)';
    case 'Low Risk': return 'rgba(76, 175, 80, 0.1)';
    default: return '#f7fafc';
  }
};

const SortContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
gap: 10px;
margin-bottom: 10px;
`;

const SortCheckbox = styled.input`
margin-right: 10px;
width: 20px;
height: 20px;
cursor: pointer;
appearance: none;
-webkit-appearance: none;
background-color: #fff;
border: 2px solid #4f46e5;
border-radius: 4px;
outline: none;
transition: all 0.3s ease;

&:checked {
  background-color: #4f46e5;
  border-color: #4f46e5;
  position: relative;
}

&:checked::before {
  content: '✔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
}

&:hover {
  border-color: #4338ca;
}
`;

const SortLabel = styled.label`
font-size: 16px;
color: #4f46e5;
font-weight: bold;
`;

const LastUpdateText = styled.div`
font-size: 14px;
color: #4a5568;
text-align: center;
margin-top: 10px;
margin-bottom: 20px;
`;

const Patients = ({ patientData }) => {
const [patients, setPatients] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [riskFilter, setRiskFilter] = useState('All');
const [sortByRiskLevel, setSortByRiskLevel] = useState(false);
const [lastUpdateTime, setLastUpdateTime] = useState(null);

useEffect(() => {
  setPatients(patientData);
  if (patientData.length > 0 && patientData[0].lastUpdated) {
    setLastUpdateTime((patientData[0].lastUpdated));
    console.log("JOS");
  } else {
    setLastUpdateTime('Not available');
  }
}, [patientData]);

const filteredAndSortedPatients = patients
  .filter(patient =>
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (riskFilter === 'All' || patient.riskLevel === riskFilter)
  )
  .sort((a, b) => {
    if (sortByRiskLevel) {
      return b.cardiacProba - a.cardiacProba;
    }
    return 0;
});

const formatTime = (date) => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

return (
  <PatientsContainer>
    <Header>
      <Title>Patient Data</Title>
      <SearchAndRefresh>
        <SearchBar>
          <FiSearch />
          <SearchInput
            type="text"
            placeholder="Search by Patient ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </SearchAndRefresh>
    </Header>
    <FilterContainer>
      <FilterButton active={riskFilter === 'All'} onClick={() => setRiskFilter('All')}>All</FilterButton>
      <FilterButton active={riskFilter === 'Low Risk'} onClick={() => setRiskFilter('Low Risk')}>Low Risk</FilterButton>
      <FilterButton active={riskFilter === 'Medium Risk'} onClick={() => setRiskFilter('Medium Risk')}>Medium Risk</FilterButton>
      <FilterButton active={riskFilter === 'High Risk'} onClick={() => setRiskFilter('High Risk')}>High Risk</FilterButton>
    </FilterContainer>
    <SortContainer>
      <SortCheckbox
        type="checkbox"
        id="sortByRisk"
        checked={sortByRiskLevel}
        onChange={(e) => setSortByRiskLevel(e.target.checked)}
      />
      <SortLabel htmlFor="sortByRisk">Sort by highest Cardiac Probability</SortLabel>
    </SortContainer>
    <LastUpdateText>
      Last Updated: {lastUpdateTime}
    </LastUpdateText>
    <Grid>
      <GridHeader>Patient ID</GridHeader>
      <GridHeader>HR</GridHeader>
      <GridHeader>BP</GridHeader>
      <GridHeader>SpO2</GridHeader>
      <GridHeader>RESP</GridHeader>
      <GridHeader>TEMP</GridHeader>
      <GridHeader>Risk Level</GridHeader>
      <AnimatePresence>
        {filteredAndSortedPatients.map((patient) => (
          <React.Fragment key={patient.id}>
            <GridItem
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              riskColor={getRiskColor(patient.riskLevel)}
            >
              {patient.id}
            </GridItem>
            <GridItem>{patient.HR}</GridItem>
            <GridItem>{patient.BP}</GridItem>
            <GridItem>{patient.SpO2}</GridItem>
            <GridItem>{patient.RESP}</GridItem>
            <GridItem>{patient.TEMP}</GridItem>
            <GridItem>{patient.riskLevel}</GridItem>
          </React.Fragment>
        ))}
      </AnimatePresence>
    </Grid>
  </PatientsContainer>
);
};

export default Patients;