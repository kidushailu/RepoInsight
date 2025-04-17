import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import IndividualInsights from './pages/IndividualInsights';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('accessToken') !== null);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear the access token from local storage
    setLoggedIn(false); // Update the loggedIn state to false
  }

  return (
    <div className="App">
      <Router>
      { 
        loggedIn ?
        <><Navbar onLogout={handleLogout}/>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/individual-insights" element={<IndividualInsights />} />
        </Routes> 
        <Footer /></>
        :
        <Routes>
          <><Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin}/>} /></>
        </Routes>
      }
      </Router>
    </div>
  );
}