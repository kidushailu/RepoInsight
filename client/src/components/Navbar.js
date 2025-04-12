import {React, useState} from 'react';
import { Link, useNavigate, useMatch, useResolvedPath } from 'react-router-dom';
import './Navbar.css';

function Navbar({onLogout}) {
  const [repoUrl, setRepoUrl] = useState('');
  const navigate = useNavigate();

  const searchRepo = () => {
    navigate('/dashboard', { state: { repoUrl } });
  }

  return (
      <nav className="nav">
        <Link to="/home" className="site-title">
          <img width="65" height="65" src="RepoInsight-logo-pptexport.png" alt="RepoInsight logo" className="site-logo"></img>
          <span>RepoInsight</span>
        </Link>
        <div className='repo-search'>
          <input type="text" value={repoUrl} placeholder="Search for a repository" className='search-bar' onChange={(e) => setRepoUrl(e.target.value)} />
          <button onClick={searchRepo}>Search</button>
        </div>
        <ul>
          <CustomLink to="/dashboard">Dashboard</CustomLink>
          <CustomLink to="/line-modification">Line Modification</CustomLink>
          <button onClick={() => {onLogout(); navigate('/');}}>Logout</button>
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
