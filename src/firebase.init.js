// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsjIfII9bC11B608T_sBOjUeEFRU-zPmY",
  authDomain: "email-password-auth-819f0.firebaseapp.com",
  projectId: "email-password-auth-819f0",
  storageBucket: "email-password-auth-819f0.firebasestorage.app",
  messagingSenderId: "949602450165",
  appId: "1:949602450165:web:3860fe6bdfd45045bf23bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)