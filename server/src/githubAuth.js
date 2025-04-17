const express = require("express");
const fetch = (...args) => 
    import("node-fetch").then(({default: fetch}) => fetch(...args));
const router = express.Router();
require('dotenv').config();

const CLIENT_ID = process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_AUTH_CLIENT_SECRET;

router.get('/test', (req, res) => {
    res.send("this is from githubAuth.js");
});

router.get('/getAccessToken', async (req, res) => {
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
    await fetch(`https://github.com/login/oauth/access_token${params}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to get access token');
        }
    }).then((data) => {
        res.json(data);
    });
});

router.get('/limit', async (req, res) => {
    await fetch('https://api.github.com/rate_limit', {headers: {
        'Authorization': req.get('Authorization')
    }})
    .then(res => res.json())
    .then(data => {
        console.log('Rate Limit:', data.rate.limit);
        console.log('Remaining:', data.rate.remaining);
        console.log('Reset Time:', new Date(data.rate.reset * 1000)); // Convert UNIX timestamp to readable date
    })
    .catch(error => console.error('Error:', error));
});

router.get('/getUserData', async (req, res) => {
    await fetch(`https://api.github.com/user`, {
        method: 'GET',
        headers: {
            'Authorization': req.get('Authorization')
        }
    }).then((response) => {
        console.log('Response Status:', response.status);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch user data');
        }
    }).then((data) => {
        res.json(data);
    });
});

module.exports = router;