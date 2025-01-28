// Import Firebase modules from Firebase SDK (v9 modular)
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { app } from './firebaseConfig.js';  // Ensure this is correctly importing the app instance

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Form submission handler
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submit (page reload)

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // Validate role input
  if (!role) {
    document.getElementById("registerError").textContent = "Please select a role.";
    return;
  }

  try {
    // Firebase user registration
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Add user role to Firestore
    await setDoc(doc(firestore, "users", userCredential.user.uid), {
      name,
      email,
      role,
    });

    // Success alert and redirect to login page
    alert("Registration successful! Please login.");
    window.location.href = "index.html";  // Redirect to login page

  } catch (error) {
    // Show error message if something goes wrong
    document.getElementById("registerError").textContent = error.message;
  }
});






  