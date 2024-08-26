import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './landing/homepage';
import Dashboard from './dashboard/dashboard';
import { useConnect } from "@connect2ic/react"

function App() {
  const { isConnected } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {}
  })

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isConnected ? <Navigate to="/dashboard" /> : <Homepage />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isConnected ? <Dashboard /> : <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;