import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
// Your web app's Firebase configuration
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

// Export the Firebase app to be used in other scripts
export { app }