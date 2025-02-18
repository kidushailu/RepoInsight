import React from "react";

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 shadow-md bg-white">
    <h1 className="text-xl font-bold">RepoInsight</h1>
    <div className="space-x-4">
      <a href="#" className="text-gray-700">Analyze</a>
      <a href="#" className="text-gray-700">Features</a>
      <a href="#" className="text-gray-700">Contact Us</a>
      <a href="#" className="text-gray-700">Explore Insights</a>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign up</button>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="flex flex-col items-center text-center p-10 bg-gray-100">
    <h2 className="text-4xl font-bold">Uncover Insights with RepoInsight</h2>
    <p className="text-gray-600 max-w-2xl mt-2">
      Unravel your repository’s potential with RepoInsight’s AI-powered analytics for enhanced understanding and visibility.
    </p>
    <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded">Sign up today</button>
  </section>
);

const FeaturesSection = () => {
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

  return (
    <section className="p-10">
      <h3 className="text-2xl font-bold text-center">Your GitHub Companion</h3>
      <p className="text-gray-600 text-center mb-6">
        Discover how RepoInsight simplifies your GitHub experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded shadow-md">
            <h4 className="font-bold">{feature.title}</h4>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-200 p-6 text-center">
    <p>© 2024 RepoInsight</p>
    <div className="mt-4 flex justify-center space-x-4 text-gray-600">
      <a href="#">Overview</a>
      <a href="#">Customers</a>
      <a href="#">About</a>
      <a href="#">Jobs</a>
      <a href="#">FAQs</a>
      <a href="#">Contact us</a>
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
    </div>
  </footer>
);

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default App;