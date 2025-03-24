const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const { getFirestore, doc, setDoc, collection } = require('firebase/firestore');

const serverAccount = require('../firebaseAdminConfig.json');

const initializeFirebaseApp = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serverAccount),
    });
};

const db = admin.firestore();

async function getUsers() {
    
    try {
        
        const snapshot = await db.collection('testCollection').get();
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return data;

    } catch (error) {
        console.error('Error initializing Firestore:', error);
    }
}

const addUser = async (user) => {
    try {
        const id = user.id;
    } catch (error) {
        
    }
};


module.exports = {
    initializeFirebaseApp,
    getUsers
};