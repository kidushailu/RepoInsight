import { BarChart, LineChart, XAxis, YAxis, Bar, Line } from "recharts";
import { useState } from "react";
import './Dashboard.css'; // Assuming you have a CSS file for styles

export default function Dashboard() {
  const [search, setSearch] = useState("");
  
  const data = [
    { month: "January", commits: 50, pullRequests: 40 },
    { month: "February", commits: 60, pullRequests: 50 },
    { month: "March", commits: 80, pullRequests: 70 },
    { month: "April", commits: 90, pullRequests: 80 },
    { month: "May", commits: 70, pullRequests: 75 },
    { month: "June", commits: 60, pullRequests: 65 },
    { month: "July", commits: 50, pullRequests: 45 },
  ];

  return (
    <div className="container">
      <header className="flex justify-between items-center pb-4">
        <h1 className="title">Dashboard</h1>
        <button className="search-button" variant="outline">View Repository</button>
      </header>
      
      <div className="metric-row">
        <div className="commits">Commits: <strong>873</strong></div>
        <div className="num-files">Total Files: <strong>345</strong></div>
        <div className="pull-requests">Pull Requests: <strong>78</strong></div>
        <div className="top-contributors">
            Top Contributors: 
            <strong>
                <ul>
                    <li>Mark</li>
                    <li>Jeff</li>
                    <li>Sarah</li>
                </ul>
            </strong>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="charts">
          <div className="line-chart">
            <h2>Commit Trends</h2>
            <LineChart data={data} width={400} height={200}>
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="commits" stroke="#8884d8" />
            </LineChart>
          </div>
          <div className="bar-chart">
            <h2>Pull Request Trends</h2>
            <BarChart data={data} width={400} height={200}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="pullRequests" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
      
      <div className="user-search">
        <input
          placeholder="Search for user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}