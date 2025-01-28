import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorLogin from "./components/DoctorLogin";
import ReceptionistLogin from "./components/ReceptionistLogin";
import DashboardDoctor from "./components/DashboardDoctor";
import DashboardReceptionist from "./components/DashboardReceptionist";
import ReceptionistForm from "./components/ReceptionistForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorLogin />} />
        <Route path="/receptionist-login" element={<ReceptionistLogin />} />
        <Route path="/doctor-dashboard" element={<DashboardDoctor />} />
        <Route path="/receptionist-dashboard" element={<DashboardReceptionist />} />
        {/* New route for Receptionist Form */}
        <Route path="/receptionist-form" element={<ReceptionistForm />} />
      </Routes>
    </Router>
  );
}

export default App;
