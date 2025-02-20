import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-title">
                <Link to="/">RepoInsight</Link>
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