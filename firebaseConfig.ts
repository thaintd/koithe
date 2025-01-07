// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZYXatDlzqOAsM-GaCYarPbNNva2O2--w",
  authDomain: "koi-the-b4e6c.firebaseapp.com",
  projectId: "koi-the-b4e6c",
  storageBucket: "koi-the-b4e6c.appspot.com",
  messagingSenderId: "645725948940",
  appId: "1:645725948940:web:ef3b0c1fd9f9bbe0fc7229",
  measurementId: "G-END4TTYHEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
