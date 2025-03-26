import { BarChart, LineChart, XAxis, YAxis, Bar, Line, Tooltip, ResponsiveContainer } from "recharts";
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
      <h3><strong>Dashboard</strong></h3>
      <div className="header">
        {repoUrl && (
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="button-link">
              View Repository
            </a>
        )}
        <p>Repo: <strong>{repoUrl ? repoUrl.split('/')[4] : 'N/A'}</strong></p>
      </div>
      <div className="metrics">
        <div className="stats">
          <section className="commits">
            <p>Commits</p>
            <h1>{totalCommits}</h1>
          </section>
          <section className="files">
            <p>Total Files</p>
            <h1>{filesCount}</h1>
          </section>
          <section className="pulls">
            <p>Pull Requests</p>
            <h1>{totalPulls}</h1>
          </section>
          <section className="top-contributors">
            <p>Top Contributors</p>
            <strong>
              <ol>
                {contributors.map((contributor) => (
                  <li key={contributor.id}>{contributor.login}</li>
                ))}
              </ol>
            </strong>
          </section>
        </div>
        <div className="visuals">
          <p>Trend Graphs</p>
          <div className="charts">
            <section className="line-chart">
              <p>Commits</p>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="commits" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </section>
            <section className="bar-chart">
              <p>Pull Requests</p>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pullRequests" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </section>
          </div>
        </div>
      </div>
      <div className="users">
        <section className="users-header">
          <p><strong>All Users</strong></p>
          <p>username</p>
          <p>#contributions</p>
        </section>
        <section className="users-list">
          {contributors.map((contributor) => (
            <div key={contributor.id} className="user">
              <p> </p>
              <section>
                <img src={contributor.avatar_url} alt="user" />
                <p>{contributor.login}</p>
              </section>
              <p>{contributor.contributions}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
