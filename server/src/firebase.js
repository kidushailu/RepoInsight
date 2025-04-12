const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

const serviceAccount = require('../firebase_creds.json');

const initializeFirebaseApp = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.getFirestore;

module.exports = { initializeFirebaseApp, db, router };


// async function getUsers() {
    
//     try {
        
//         const snapshot = await db.collection('testCollection').get();
//         const data = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));
//         return data;

//     } catch (error) {
//         console.error('Error initializing Firestore:', error);
//     }
// }