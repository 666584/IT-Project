import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Module from './components/Module';
import Games from './components/Games.js';
import Goal from './components/Goal.js';
import Profile from './components/Profile.js';
import Layout from './components/Layout/Layout.js';
import Register from './components/RegisterComponent';
import Dashboard from './components/Dashboard.js';
import Test from './components/ModuleComponent';
import GoogleLoginProcess from './components/GoogleLogin.js'
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
          <Route path="/google/callback" element={<GoogleLoginProcess />} />

          {/* Private routes */}
          <Route path="/goal/testing" element={<PrivateRoute> <Test /> </PrivateRoute>} />
          <Route path="/user/:userId" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
          
          <Route element={<Layout />}>
            <Route exact path="/dashboard/:userId" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
            <Route path="/module" element={<PrivateRoute> <Module /> </PrivateRoute>} />
            <Route path="/games" element={<PrivateRoute> <Games /> </PrivateRoute>} />
            <Route path="/goal/:title/:userId" element={<PrivateRoute> <Goal /> </PrivateRoute>} />
          </Route>

          <Route path="/moduleTest" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;