import { BarChart, LineChart, XAxis, YAxis, Bar, Line, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import './IndividualInsights.css';
import { useLocation } from "react-router-dom";

export default function IndividualInsights() {
  const location = useLocation();
  const repoUrl = location.state?.url || "";
  const user = location.state?.user || "";
  const contributions = location.state?.contributions || "";
  const [totalPulls, setTotalPulls] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalCommits, setTotalCommits] = useState([]);
  const [individualCommits, setIndividualCommits] = useState(0);
  const [commitDetails, setCommitDetails] = useState({});
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
      setTotalCommits(data.commits);
      let commits = 0;
      for (const item of data.commits) {
        if (item.committer.login === user) {
          const date = new Date(item.commit.committer.date);
          const month = date.getUTCMonth()
          chartData[month].commits++;
          commits++;
        }
      };
      setIndividualCommits(commits);
      setChartData([...chartData]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getComments = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/searchRepo/comments?repoUrl=${encodeURIComponent(repoUrl)}`);
      if (!response.ok) {console.error('Error fetching repositories:', response.statusText);}
      const data = await response.json();
      
      let comments = 0;
      for (const item of data) {
        if (item.user.login === user) {
          comments++;
        }
      };
      setTotalComments(comments);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getPulls = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/searchRepo/pulls?repoUrl=${encodeURIComponent(repoUrl)}`);
      if (!response.ok) console.error('Error fetching repositories:', response.statusText);
      const data = await response.json();

      let pulls = 0;
      for (const item of data) {
        if (item.user.login === user) {
          const date = new Date(item.created_at);
          const month = date.getUTCMonth()
          chartData[month].pullRequests++;
          pulls++;
        }
      };
      setTotalPulls(pulls);
      setChartData([...chartData]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Styles for the table
  const thStyle = {
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderBottom: "2px solid #ccc",
    textAlign: "left",
    width: "25%"
  };
  
  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd"
  };

  useEffect(() => {
    if (repoUrl) {
      getCommits();
      getPulls();
      getComments();
    }
  }, [repoUrl]);

  useEffect(() => {
    async function fetchCommitDetails() {
      const details = {};
      for (const commit of totalCommits) {
        if (commit.committer.login === user) {
          try {
            const data = await fetch(
              `http://localhost:4000/api/searchRepo/commit-details?repoUrl=${encodeURIComponent(repoUrl)}&sha=${commit.sha}`
            );
            if (!data.ok) {
              console.error("Error fetching commit details:", data.statusText);
              continue;
            }
            const commitDetail = await data.json();
            details[commit.sha] = commitDetail;
          } catch (error) {
            console.error("Error:", error);
          }
        }
      }
      setCommitDetails(details);
    }
  
    if (totalCommits.length > 0) {
      fetchCommitDetails();
    }
  }, [totalCommits]);

  return (
    <div className="container">
      <div className="header">
        <h3><strong>{user}</strong></h3>
        <p>{repoUrl ? repoUrl.split('/')[4] : 'N/A'}</p>
      </div>
      <div className="metrics">
        <div className="stats">
          <section className="commits">
            <p>Commits</p>
            <h1>{individualCommits}</h1>
          </section>
          <section className="comments">
            <p>Comments</p>
            <h1>{totalComments}</h1>
          </section>
          <section className="pulls">
            <p>Pull Requests</p>
            <h1>{totalPulls}</h1>
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
      <div className="activity">
        <p><strong>Activity</strong></p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Event</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>File</th>
              </tr>
            </thead>
            <tbody>
              {totalCommits.map((commit) => 
                commit.committer.login === user && commitDetails[commit.sha] ? (
                    <tr key={commit.sha}>
                      <td style={tdStyle}>Commit</td>
                      <td style={tdStyle}>{new Date(commit.commit.committer.date).toLocaleDateString()}</td>
                      <td style={tdStyle}>{commit.commit.message}</td>
                      <td style={tdStyle}>
                        <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
                          {commitDetails[commit.sha].files[0].filename.split('/').pop()}
                        </a>
                      </td>
                    </tr> ) : null )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
