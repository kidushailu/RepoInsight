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
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Rout />
      <Footer />
    </Router>
    </div>
  );
}

// Define the routes for the application
function Rout() {
  return (
    <div className="routes">
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/individual-insights" element={<IndividualInsights />} />
      <Route path="/line-modification" element={<LineModification />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
    </div>
  );
}

export default App;
