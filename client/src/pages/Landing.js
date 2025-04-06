import React from "react";
import './Landing.css';
import Image from '../images/DashBoardPage.png';
import Login from "./Login";

const features = [
  { title: "Instant Analysis", description: "Maintain clarity with cleaner, organized code." },
  { title: "Repo Metrics", description: "Unlock valuable insights from your repo’s data." },
  { title: "Data Insights", description: "Visualize key metrics for your repo’s performance." },
  { title: "Code Clarity", description: "Get instant analytics for GitHub repositories." },
  { title: "Activity Alerts", description: "Get notified about key repository changes." },
  { title: "Secure Data", description: "Ensures data integrity with secure encryption." },
  { title: "Review Offline", description: "Analyze repository data even when offline." },
  { title: "Quick Share", description: "Seamlessly share insights from your repo analysis." },
];

const footerLinks = [
  "About", "FAQs", "Contact Us", "Terms", "Privacy"
];

const navbarLinks = [
  "Analyze", "Features", "Contact", "Explore Insights"
];


export default function LandingPage() {
  const goToLogin = () => {
    window.location.href = '/login';;
  }

  // useEffect(() => {
  //   const navigate = useNavigate();
  // }, []);
  
  return (
    <div className="landing-container">
      <nav>
        <section>
          <img width="65" height="65" src="RepoInsight-logo-pptexport.png" alt="RepoInsight logo" className="site-logo"/>
          <span><strong>RepoInsight</strong></span>
        </section>
        <section className="navbar-links">
          { navbarLinks.map((link, idx) => (
            <button key={idx} className="link">{link}</button>
          ))}
          <button className="login-button" onClick={goToLogin}>Login with GitHub</button>
        </section>
      </nav>
      <div className="content">
        <section className="intro">
          <div className="slogan">
            <h1><strong>Uncover Insights with RepoInsight</strong></h1>
            <p>Unravel your repository's potential with RepoInsights's analytics for enhanced understanding and visibility.</p>
            <button className="login-button" onClick={goToLogin}>Login with GitHub</button>
          </div>
          <div className="image">
            <img width="500" height="auto" src={Image} alt="prototype-img"/>
          </div>
        </section>
        <section className="features-section">
          <div className="features-header">
            <h3><strong>Your GitHub Companion</strong></h3>
            <p>Discover how RepoInsight simplifies your GitHub experience.</p>
          </div>
          <div className="features">
            { features.map((feature, idx) => (
              <div key={idx} className="feature">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
                <button><strong>Learn more</strong></button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <footer>
        <section className="footer-logo">
          <div>
            <img width="65" height="65" src="RepoInsight-logo-pptexport.png" alt="RepoInsight logo" className="site-logo"/>
            <p><strong>RepoInsight</strong></p>
          </div>
            <p>© 2025 RepoInsight</p>
        </section>
        <section>
          { footerLinks.map((link, idx) => (
            <button key={idx} className="link">{link}</button>
          ))}
        </section>
      </footer>
    </div>
  );
}