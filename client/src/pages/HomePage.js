import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

export default function HomePage() {

    const [userData, setUserData] = useState({});
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        async function getUserData() {
            await fetch(`http://localhost:4000/auth/getUserData`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((response) => {
                return response.json();
            }).then((data) => {
                setUserData(data);
            });
        }
        if (localStorage.getItem("accessToken") === null) {
            // Redirect to login if no access token is found
            window.location.assign(`http://localhost:4000/auth/login`);
        }
        else {
            // Fetch user data if access token exists
            getUserData();
        }
    }, []);
    
    useEffect(() => {
        const storedRepos = JSON.parse(localStorage.getItem("searchedRepos")) || [];
        setSearchHistory(storedRepos);
    }
    , []);

    return (
        <div className="home-page-container">
            <h1>Welcome {userData.login}!</h1>
            {searchHistory.length > 0 ? (
                <div className="search-history">
                    <h3>Recent Searches:</h3>
                    {searchHistory.map((repo, index) => (
                    <Link key={index} to="/dashboard" state={{ repoUrl: repo }} className="search-link">
                        {repo}
                    </Link>
                    ))}
                </div>
            ) : <p>No search history found.</p>}
        </div>
    );
}