import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuinh4hoa5gTgkY9UAOtKgd7NKlNtOayw",
    authDomain: "dojo-blog-652c7.firebaseapp.com",
    projectId: "dojo-blog-652c7",
    storageBucket: "dojo-blog-652c7.appspot.com",
    messagingSenderId: "168903005373",
    appId: "1:168903005373:web:1ce1774cbcb2c455bc93d4"
};

// init firebase
firebase.initializeApp(firebaseConfig);
// init firestore
const db = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
const auth = firebase.auth()

export { db, timestamp, auth }