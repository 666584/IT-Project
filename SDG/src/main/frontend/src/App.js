import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Module from './components/Module';
import Games from './components/Games.js';
import Goal from './components/Goal.js';
import Layout from './components/Layout/Layout.js';
import Register from './components/RegisterComponent';
import Dashboard from './components/DashboardComponent';
import Test from './components/ModuleComponent';
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
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path="/goal/testing" element={<PrivateRoute> <Test /> </PrivateRoute>} />
          <Route element={<Layout />}>
            <Route path="/module" element={<PrivateRoute> <Module /> </PrivateRoute>} />
            <Route path="/games" element={<PrivateRoute> <Games /> </PrivateRoute>} />
            <Route exact path="/goal/:title" element={<PrivateRoute> <Goal /> </PrivateRoute>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;