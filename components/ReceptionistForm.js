import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReceptionistForm = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    tokenNumber: "",
    medicalHistory: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add patient data to Firestore
      const docRef = await addDoc(collection(db, "patients"), patientData);
      alert(`Patient added successfully! Document ID: ${docRef.id}`);
      setPatientData({ name: "", age: "", tokenNumber: "", medicalHistory: "" });
    } catch (error) {
      alert("Error adding patient: " + error.message);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add Patient Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1" htmlFor="name">
              Patient Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={patientData.name}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={patientData.age}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="tokenNumber">
              Token Number
            </label>
            <input
              type="text"
              name="tokenNumber"
              id="tokenNumber"
              value={patientData.tokenNumber}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="medicalHistory">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              id="medicalHistory"
              value={patientData.medicalHistory}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <Button type="submit" className="w-full bg-blue-500 text-white">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReceptionistForm;
