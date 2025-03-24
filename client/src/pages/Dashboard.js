import { BarChart, LineChart, XAxis, YAxis, Bar, Line, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";
import './Dashboard.css';
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const repoUrl = location.state?.repoUrl || "";
  const [search, setSearch] = useState('');
  const [totalCommits, setTotalCommits] = useState(0);
  const [totalPulls, setTotalPulls] = useState(0);
  const [contributors, setContributors] = useState([]);
  const [filesCount, setFilesCount] = useState(0);
  const [chartData, setChartData] = useState([
    { month: "January", commits: 0, pullRequests: 0 },
    { month: "February", commits: 0, pullRequests: 0 },
    { month: "March", commits: 0, pullRequests: 0 },
    { month: "April", commits: 0, pullRequests: 0 },
    { month: "May", commits: 0, pullRequests: 0 },
    { month: "June", commits: 0, pullRequests: 0 },
    { month: "July", commits: 0, pullRequests: 0 },
    { month: "August", commits: 0, pullRequests: 0 },
    { month: "September", commits: 0, pullRequests: 0 },
    { month: "October", commits: 0, pullRequests: 0 },
    { month: "November", commits: 0, pullRequests: 0 },
    { month: "December", commits: 0, pullRequests: 0 },
  ]);

  const getCommits = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/searchRepo/commits?repoUrl=${encodeURIComponent(repoUrl)}`);

      if (!response.ok) {console.error('Error fetching repositories:', response.statusText);}

      const data = await response.json();
      setTotalCommits(data.total);
      
      for (const item of data.commits) {
        const date = new Date(item.commit.committer.date);
        const month = date.getUTCMonth()
        chartData[month].commits++;
      };
      setChartData([...chartData]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getPulls = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/searchRepo/pulls?repoUrl=${encodeURIComponent(repoUrl)}`);
      if (!response.ok) console.error('Error fetching repositories:', response.statusText);
      const data = await response.json();
      setTotalPulls(data.length);

      for (const item of data) {
        const date = new Date(item.created_at);
        const month = date.getUTCMonth()
        chartData[month].pullRequests++;
      };
      setChartData([...chartData]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getContributors = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/searchRepo/contributors?repoUrl=${encodeURIComponent(repoUrl)}`);
      if (response.ok) {
        const data = await response.json();
        setContributors(data);
      } else {
        console.error('Error fetching repositories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getFilesCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/searchRepo/files?repoUrl=${encodeURIComponent(repoUrl)}`);
      if (response.ok) {
        const data = await response.json();
        setFilesCount(data);
      } else {
        console.error('Error fetching repositories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (repoUrl) {
    getCommits();
    getPulls();
    getContributors();
    getFilesCount();
    }
  }, [repoUrl]);

  
  return (
    <div className="container">
      <header className="flex justify-between items-center pb-4">
        <h1 className="title">Dashboard</h1>
        {repoUrl && (
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="button-link">
            View Repository
          </a>
        )}      
      </header>
      <div class="container text-center">
        <div class="row align-items-start">
          <div class="col">
            <br />
          </div>
          <div class="col">
            <div className="dashbox metric-row">
              <h2>Metrics</h2>
              <div className="commits">Commits: <strong>{totalCommits}</strong></div>
              <div className="num-files">Total Files: <strong>{filesCount}</strong></div>
              <div className="pull-requests">Pull Requests: <strong>{totalPulls}</strong></div>
              <div className="top-contributors">
                Top Contributors:
                <strong>
                  <ol>
                    {contributors.map((contributor) => (
                      <li key={contributor.id}>{contributor.login}</li>
                    ))}
                  </ol>
                </strong>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="charts">
                <div className="dashbox line-chart">
                  <h2>Commit Trends</h2>
                  <LineChart data={chartData} width={400} height={200}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="commits" stroke="#8884d8" />
                  </LineChart>
                </div>
                <div className="dashbox bar-chart">
                  <h2>Pull Request Trends</h2>
                  <BarChart data={chartData} width={400} height={200}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pullRequests" fill="#82ca9d" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="dashbox user-search">
              <h2>Search</h2>
              <input
                placeholder="Search for user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div class="col">
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
