const express = require('express');
const cors = require('cors');
const githubAPI = require('./githubAPI');
const githubAuth = require('./githubAuth');
const { initializeFirebaseApp, router: firebaseRouter } = require('./firebase');


const app = express();

app.use(cors());
app.use(express.json());

initializeFirebaseApp();
app.use('/api/github', githubAPI);
app.use('/auth', githubAuth);
app.use('/api', firebaseRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});