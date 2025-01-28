import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ReceptionistDashboard = () => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [tokenNumber, setTokenNumber] = useState('');
  const [patientList, setPatientList] = useState([]);

  const handleAddPatient = () => {
    const newPatient = {
      name: patientName,
      age: patientAge,
      token: tokenNumber,
    };

    // Save newPatient to Firebase (not implemented yet)

    setPatientList([...patientList, newPatient]);
    setPatientName('');
    setPatientAge('');
    setTokenNumber('');
  };

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-xl font-bold">Add Patient Details</h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Patient Age"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Token Number"
              value={tokenNumber}
              onChange={(e) => setTokenNumber(e.target.value)}
            />
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Patient List</h2>
        </CardHeader>
        <CardContent>
          <div>
            {patientList.length > 0 ? (
              <ul>
                {patientList.map((patient, index) => (
                  <li key={index} className="mb-2">
                    Token {patient.token}: {patient.name}, {patient.age} years old
                  </li>
                ))}
              </ul>
            ) : (
              <p>No patients added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceptionistDashboard;
