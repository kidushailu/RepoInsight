const express = require('express');
const fetch = require('node-fetch');
const { db } = require('./firebase.js')
const router = express.Router();
require('dotenv').config();

const header = { "Authorization": `Bearer ${process.env.GITHUB_API_KEY}` }


router.get('/searchRepo', async (req, res) => {
    await fetch('https://api.github.com/rate_limit', {headers: header})
    .then(res => res.json())
    .then(data => {
        console.log('Rate Limit:', data.rate.limit);
        console.log('Remaining:', data.rate.remaining);
        console.log('Reset Time:', new Date(data.rate.reset * 1000)); // Convert UNIX timestamp to readable date
    })
    .catch(error => console.error('Error:', error));
});

router.get('/searchRepo/commits', async(req, res) => {
    const { repoUrl } = req.query;
    const apiUrl = repoUrl.replace("github.com", "api.github.com/repos") + "/commits"; 
    const data = {total: 0, commits: []}; // Initialize data object to store total and commits
    try {
        const response1 = await fetch(apiUrl + "?per_page=1", { headers: header });
        const response2 = await fetch(apiUrl + "?per_page=100", { headers: header });
        if (!response1.ok || !response2.ok) {
            res.status(response.status).json({ error: response.statusText });
        }
        const linkHeader = response1.headers.get("Link");
        if (linkHeader) {
            const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
            if (match) data['total'] = parseInt(match[1], 10);
        }
        data['commits'] = await response2.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/searchRepo/commit-details', async(req, res) => {
    const { repoUrl, sha } = req.query;
    const apiUrl = repoUrl.replace("github.com", "api.github.com/repos") + "/commits"; 
    try {
        const response = await fetch(apiUrl + `/${sha}`, { headers: header });
        
        if (!response.ok) {
            res.status(response.status).json({ error: response.statusText });
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/searchRepo/contributors', async(req, res) => {
    const { repoUrl } = req.query;
    const apiUrl = repoUrl.replace("github.com", "api.github.com/repos") + "/contributors?per_page=100"; 
    try {
        const response = await fetch(apiUrl, { headers: header });
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: response.statusText });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/searchRepo/pulls', async(req, res) => {
    const { repoUrl } = req.query;
    const apiUrl = repoUrl.replace("github.com", "api.github.com/repos") + "/pulls?per_page=100"; 
    try {
        const response = await fetch(apiUrl, { headers: header });
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: response.statusText });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/searchRepo/comments', async(req, res) => {
    const { repoUrl } = req.query;
    const apiUrl = repoUrl.replace("github.com", "api.github.com/repos") + "/comments?per_page=100"; 
    try {
        const response = await fetch(apiUrl, { headers: header });
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: response.statusText });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/searchRepo/files', async (req, res) => {
  const { repoUrl } = req.query;
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');

  try {
    const fileCount = await countFiles(owner, repo);
    res.json(fileCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


async function countFiles(owner, repo) {
    try {
        const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;
        const branch = await getDefaultBranch(baseUrl);
        const API_URL = `${baseUrl}/git/trees/${branch}?recursive=1`;

        const response = await fetch(API_URL, { headers: header });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.tree) {
            throw new Error("Invalid response from GitHub API.");
        }

        const fileCount = data.tree.filter(entry => entry.type === "blob").length;
        // console.log(`Total number of files in the repository (${branch} branch): ${fileCount}`);
        return fileCount;
    } catch (error) {
        console.error("Error fetching repository data:", error);
    }
}

async function getDefaultBranch(repoUrl) {
    try {
        const response = await fetch(repoUrl, { headers: header });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.default_branch || "main"; // Fallback to "main" if not found
    } catch (error) {
        console.error("Error fetching repository data:", error);
        return "main"; // Default to "main" if an error occurs
    }
}

module.exports = router;