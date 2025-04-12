const express = require('express');
const cors = require('cors');
const githubAPI = require('./githubAPI');
const githubAuth = require('./githubAuth');
const { initializeFirebaseApp } = require('./firebase.js');

const app = express();

app.use(cors());
app.use(express.json());

initializeFirebaseApp();
app.use('/api', githubAPI);
app.use('/auth', githubAuth);

const port = 4000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});