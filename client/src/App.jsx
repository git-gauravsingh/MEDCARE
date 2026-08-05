import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import HospitalDetails from './pages/healthcare/HospitalDetails';
import DoctorDetails from './pages/healthcare/DoctorDetails';
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/public/HomePage';
import Dashboard from './pages/dashboard/Dashboard';
import AIAssistant from './pages/dashboard/AIAssistant';
import ManageMedicine from './pages/dashboard/ManageMedicine';
import UpcomingCheckups from './pages/dashboard/UpcomingCheckups';
import Doctors from './pages/healthcare/Doctors';
import Hospitals from './pages/healthcare/Hospitals';
import Clinics from './pages/healthcare/Clinics';
import ClinicDetails from './pages/healthcare/ClinicDetails';
import MedicalStore from './pages/medicine/MedicalStore';
import MedicineDetails from './pages/medicine/MedicineDetails';
import Blogs from './pages/blogs/Blogs';
import Appointments from './pages/appointment/Appointments';
import AppointmentDetails from './pages/appointment/AppointmentDetails';
import Reports from './pages/dashboard/Reports';
import Contact from './pages/public/Contact';
import Help from './pages/public/Help';
import Settings from './pages/public/Settings';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OTPVerification from './pages/auth/OTPVerification';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Authentication Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
          </Route>

          {/* Unprotected Dashboard Routes (Accessible to everyone) */}
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/upcoming-checkups" element={<UpcomingCheckups />} />
            <Route path="/manage-medicine" element={<ManageMedicine />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            <Route path="/hospital/:id" element={<HospitalDetails />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/clinic/:id" element={<ClinicDetails />} />
            <Route path="/medicine" element={<MedicalStore />} />
            <Route path="/medicine/:id" element={<MedicineDetails />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointment/:id" element={<AppointmentDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;