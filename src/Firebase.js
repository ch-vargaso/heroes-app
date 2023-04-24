// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpLCqR-hYGqaoNzNN_tlbj0ccxdqNmZ0c",
  authDomain: "heroes-react-4e16a.firebaseapp.com",
  projectId: "heroes-react-4e16a",
  storageBucket: "heroes-react-4e16a.appspot.com",
  messagingSenderId: "961409885376",
  appId: "1:961409885376:web:665573027485404177f925"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
