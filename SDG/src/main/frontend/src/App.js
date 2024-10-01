import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/RegisterComponent';
import Goals from './components/Goals';
import Dashboard from './components/DashboardComponent';
import Module from './components/ModuleComponent';
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Private routes */}
                <Route path="/goals" element={<PrivateRoute> <Goals /> </PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
                <Route path="/module" element={<PrivateRoute> <Module /> </PrivateRoute>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;