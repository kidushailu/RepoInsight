// const { initializeFirebaseApp, getUsers } = require('./firebase.js');
const express = require('express');
const cors = require('cors');
const githubAPI = require('./githubAPI');

const app = express();

app.use(cors());
app.use(express.json());

// initializeFirebaseApp();
app.use('/api', githubAPI);


const port = 4000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});