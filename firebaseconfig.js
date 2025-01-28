// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzvfBXn8eWZJSpt8XekzrrpuAmAAa7ZWM",
  authDomain: "clinic-management-system-86f47.firebaseapp.com",
  projectId: "clinic-management-system-86f47",
  storageBucket: "clinic-management-system-86f47.firebasestorage.app",
  messagingSenderId: "171142767966",
  appId: "1:171142767966:web:5545b214a36997cc735bcf",
  measurementId: "G-YVYBH67EHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);