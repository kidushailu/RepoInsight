import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LineModification from './pages/LineModification';
import IndividualInsights from './pages/IndividualInsights';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
          <Route path="/line-modification" element={<LineModification />} />
          <Route path="/individual-insights" element={<IndividualInsights />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
