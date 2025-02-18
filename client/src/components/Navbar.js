import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navMainMenu" className="navbar-collapse collapse">
                    <div className="navbar-nav ml-auto nav-links">
                        <Link to="/" className="nav-item nav-link">Home</Link>
                        <Link to="/line-modification" className="nav-item nav-link">Line Modification</Link>
                        <Link to="/individual-insights" className="nav-item nav-link">Individual Insights</Link>
                        <Link to="/dashboard" className="nav-item nav-link">Dashboard</Link>
                        <Link to="/login" className="nav-item nav-link">Login</Link>
                        <Link to="/sign-up" className="nav-item nav-link">Sign Up</Link>
                        <Link to="/landing" className="nav-item nav-link">Landing</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
