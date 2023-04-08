// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr0SwG1odqXwbLsV7raE1q7QJLAyfmdoA",
  authDomain: "smartlightcontrolsystem.firebaseapp.com",
  projectId: "smartlightcontrolsystem",
  storageBucket: "smartlightcontrolsystem.appspot.com",
  messagingSenderId: "241208190474",
  appId: "1:241208190474:web:72cacc1e426e1a11c421f3",
  measurementId: "G-XSBK5BXKV4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);