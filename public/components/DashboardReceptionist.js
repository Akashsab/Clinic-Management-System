import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, query, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

function DashboardReceptionist() {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [history, setHistory] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      setMessage("Please log in to access the dashboard.");
    } else {
      setIsLoggedIn(true);
      fetchPatients();
    }
  }, []);

  // Fetch patients' data from Firestore
  const fetchPatients = async () => {
    try {
      const q = query(collection(db, "patients"));
      const querySnapshot = await getDocs(q);
      const patientList = querySnapshot.docs.map(doc => doc.data());
      setPatients(patientList);
    } catch (err) {
      console.error("Error fetching patients:", err);
      setMessage("Failed to fetch patients.");
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (!token || !name || !age || !history) {
      setMessage("All fields are required.");
      return;
    }

    if (isNaN(age) || age <= 0) {
      setMessage("Age must be a positive number.");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("Please log in to add a patient.");
        return;
      }

      // Add new patient to Firestore
      await addDoc(collection(db, "patients"), {
        token,
        name,
        age: parseInt(age), // Ensure age is stored as a number
        history,
        addedBy: user.uid, // Store who added the patient
      });

      setMessage("Patient added successfully!");
      setToken("");
      setName("");
      setAge("");
      setHistory("");
      fetchPatients();  // Refresh patient list
    } catch (err) {
      console.error("Error adding patient:", err);
      setMessage("Failed to add patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setMessage("Logged out successfully.");
      })
      .catch((err) => {
        console.error("Logout error:", err);
        setMessage("Failed to log out.");
      });
  };

  return (
    <div className="card">
      <h2>Receptionist Dashboard</h2>
      {!isLoggedIn ? (
        <p>{message}</p>
      ) : (
        <div>
          <form onSubmit={handleAddPatient} className="form">
            <input
              type="text"
              placeholder="Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <textarea
              placeholder="Medical History"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Adding Patient..." : "Add Patient"}
            </button>
          </form>

          {message && <div className={`alert ${message.includes("success") ? "success" : "error"}`}>{message}</div>}

          <h3>Patients List</h3>
          <ul>
            {patients.map((patient, index) => (
              <li key={index}>
                <strong>{patient.name}</strong> (Token: {patient.token}, Age: {patient.age}) - {patient.history}
              </li>
            ))}
          </ul>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default DashboardReceptionist;
