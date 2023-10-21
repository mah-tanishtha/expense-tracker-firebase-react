// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoihuWw_pTTIJgU1vKuhwX0yiYxgz-3ZM",
  authDomain: "expense-tracker-8d6bd.firebaseapp.com",
  projectId: "expense-tracker-8d6bd",
  storageBucket: "expense-tracker-8d6bd.appspot.com",
  messagingSenderId: "570708309436",
  appId: "1:570708309436:web:6e4fb9b268c6a1bca327b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)