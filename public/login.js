import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { app } from './firebaseConfig.js'; // Ensure this is correctly importing your Firebase app

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Handle form submission for login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from reloading the page
  
  // Get email and password from form inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Firebase user login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(firestore, "users", userCredential.user.uid));

    if (userDoc.exists()) {
      const role = userDoc.data().role;

      // Redirect based on user role
      if (role === "Doctor") {
        window.location.href = "doctor-dashboard.html";
      } else if (role === "Receptionist") {
        window.location.href = "receptionist-dashboard.html";
      } else {
        throw new Error("Invalid role");
      }
    } else {
      throw new Error("User data not found.");
    }
  } catch (error) {
    // Display any login or Firestore errors
    document.getElementById("loginError").textContent = error.message;
  }
});
  