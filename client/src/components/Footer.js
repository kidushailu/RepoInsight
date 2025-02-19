import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="container">
            <div className="footer-title">
                <h4>RepoInsight</h4>
            </div>
            <div className="footer-links">
                <Link to="/about-us">About Us</Link>
                <Link to="/terms">Terms</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/help">Help</Link>
            </div>
        </div>
    );
}

export default Footer;