const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

const serviceAccount = require('./firebase_creds.json');

let db = null;

const initializeFirebaseApp = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase initialized');
    db = admin.firestore();
  }
};

router.post('/users', async (req, res) => {
  const { id, name, email } = req.body;
  try {
    await db.collection('users').doc(id).set({ name, email });
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user: ' + error.message);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send('User not found');
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).send('Error reading user: ' + error.message);
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).update(req.body);
    res.send('User updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user: ' + error.message);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).delete();
    res.send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user: ' + error.message);
  }
});

module.exports = {
  initializeFirebaseApp,
  router,
};