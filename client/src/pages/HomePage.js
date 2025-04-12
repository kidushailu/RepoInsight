import React, { useEffect, useState } from "react";
import './HomePage.css';

export default function HomePage() {

    const [userData, setUserData] = useState({});

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
    

    return (
        <div className="home-page-container">
            <h1>Welcome {userData.login}!</h1>
        </div>
    );
}