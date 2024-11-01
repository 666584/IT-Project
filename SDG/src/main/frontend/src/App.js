import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Module from './pages/Module.js';
import Goal from './pages/Goal.js';
import Social from './pages/Social.js';
import Layout from './components/Layout/Layout.js';
import SignUp from './pages/SignUp.js';
import Dashboard from './pages/Dashboard.js';
import Comic from './pages/Comic.js';
import Questions from './pages/Questions.js';
import GoogleLoginProcess from './pages/GoogleLogin.js';
import PrivateRoute from './PrivateRoute.js';
import PostTest from './pages/PostTest.js';
import Profile from './pages/Profile.js';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/google/callback" element={<GoogleLoginProcess />} />
          <Route path="/goal/:title/:task/quizzes" element={<Questions />} />
          <Route path="/goal/:title/:task" element={<Comic />} />


          {/* Private routes */}
          <Route element={<Layout />}>
            <Route path="/social/post/:userId" element={<PrivateRoute> <PostTest /> </PrivateRoute>} />
            <Route path="/profile/:userId" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
            
            <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
            <Route path="/module" element={<PrivateRoute> <Module /> </PrivateRoute>} />
            <Route path="/goal/:title" element={<PrivateRoute> <Goal /> </PrivateRoute>} />
            <Route path="/social" element={<PrivateRoute> <Social /> </PrivateRoute>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;