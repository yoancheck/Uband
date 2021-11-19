// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY36TXHdo02Pqp8TFeksm2CTDjSymqSXo",
  authDomain: "uband-52bab.firebaseapp.com",
  projectId: "uband-52bab",
  storageBucket: "uband-52bab.appspot.com",
  messagingSenderId: "531776692851",
  appId: "1:531776692851:web:d7a676244df8aab3eec006",
  measurementId: "G-2P79LWM1NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);