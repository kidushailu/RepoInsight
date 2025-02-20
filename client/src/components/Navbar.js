import React from 'react';
import { Link } from 'react-router-dom';
import { useMatch, useResolvedPath } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
            <img width="65" height="65" src="RepoInsight-logo-pptexport.png" alt="RepoInsight logo" className="site-logo"></img>
            <span>RepoInsight</span>
            </Link>
            <ul>
            <CustomLink to="/" >Home</CustomLink>
            <CustomLink to="/line-modification">Line Modification</CustomLink>
            <CustomLink to="/individual-insights">Individual Insights</CustomLink>
            <CustomLink to="/dashboard">Dashboard</CustomLink>
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/sign-up">Sign Up</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}

export default Navbar;
