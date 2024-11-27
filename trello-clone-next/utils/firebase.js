// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtR9TpMW8q22oZl--xY6s9ayglsyunR_A",
  authDomain: "trello-angular-2e7ad.firebaseapp.com",
  projectId: "trello-angular-2e7ad",
  storageBucket: "trello-angular-2e7ad.firebasestorage.app",
  messagingSenderId: "940828117761",
  appId: "1:940828117761:web:99334bdd488ddf71856900"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized Firebase app for use in other files
export default app;
