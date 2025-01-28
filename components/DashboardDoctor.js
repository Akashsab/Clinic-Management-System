// Ensure Firebase is initialized
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

// Function to fetch and display patients
async function viewPatients() {
  const patientsDiv = document.getElementById("patientList");
  patientsDiv.innerHTML = "<h2>Loading patients...</h2>";

  try {
    const querySnapshot = await getDocs(collection(db, "patients"));
    if (querySnapshot.empty) {
      patientsDiv.innerHTML = "<p>No patients found.</p>";
    } else {
      const patientsHtml = querySnapshot.docs
        .map(doc => `<p>${doc.data().name} - ${doc.data().token}</p>`)
        .join("");
      patientsDiv.innerHTML = `<h2>Patients</h2>${patientsHtml}`;
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
    patientsDiv.innerHTML = `<p>Error loading patients: ${error.message}</p>`;
  }
}

// Function to log out
function logout() {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "login.html";
    })
    .catch(error => {
      console.error("Error logging out:", error);
      alert("Logout failed. Please try again.");
    });
}



