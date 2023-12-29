import firebase, { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    storageBucket: process.env.storageBucket,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

//process.env.endPoint

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export  const db = getFirestore(app);

// console.log(db)

export default firebase