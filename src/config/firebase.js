import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBstyA1-2l1ZCRnzr9QinLrILrW_FM9WIY",
    authDomain: "todoapp-f1fb9.firebaseapp.com",
    projectId: "todoapp-f1fb9",
    storageBucket: "todoapp-f1fb9.appspot.com",
    messagingSenderId: "870579356359",
    appId: "1:870579356359:web:82b9a7b5d478750231b4e2"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export { db };