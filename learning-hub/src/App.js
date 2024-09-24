// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Import the Home component
import Login from './components/Login'; // Import the Login component
import './App.css'; // Optional: Import global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the Home page */}
          <Route path="/" element={<Home />} />

          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
