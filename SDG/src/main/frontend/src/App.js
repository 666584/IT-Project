import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Module from './components/Module.js';
import GameInfo from './components/GameInfo.js';
import Games from './components/Games.js';
import Goal from './components/Goal.js';
import Social from './components/Social.js';
import Layout from './components/Layout/Layout.js';
import SignUp from './components/SignUp.js';
import Dashboard from './components/Dashboard.js';
import Comic from './components/Comic.js';
import Questions from './components/Questions.js';
import GoogleLoginProcess from './components/GoogleLogin.js';
import PrivateRoute from './PrivateRoute.js';
import PostTest from './components/PostTest.js';

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

            <Route path="/games" element={<PrivateRoute> <Games /> </PrivateRoute>} />
            <Route path="/dashboard/:userId" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
            <Route path="/module" element={<PrivateRoute> <Module /> </PrivateRoute>} />
            <Route path="/games/info" element={<PrivateRoute> <GameInfo /> </PrivateRoute>} />
            <Route path="/:userId/goal/:title" element={<PrivateRoute> <Goal /> </PrivateRoute>} />
            <Route path="/social" element={<PrivateRoute> <Social /> </PrivateRoute>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;