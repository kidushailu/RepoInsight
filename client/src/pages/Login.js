import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = "Ov23ligcn6jgLrdL9kIx";

export default function Login({onLogin}) {
    const navigate = useNavigate();

    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');

        if (code && (localStorage.getItem("accessToken") === null)) {
            async function getAccessToken() {
                await fetch(`http://localhost:4000/auth/getAccessToken?code=${code}`, {
                    method: "GET"
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    if(data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                    }
                }).then(() => {
                    if (localStorage.getItem('accessToken') !== null) {
                        navigate('/home');
                    }
                });
            }
            getAccessToken();
            onLogin();
        }
    }, []);
    

    function loginWithGithub() {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
    };

    return (
        <div className='login-container'>
            <h3>RepoInsight Login</h3>
            <button onClick={loginWithGithub} className="login-button">
                Login with Github
            </button>    
        </div>
    );
}