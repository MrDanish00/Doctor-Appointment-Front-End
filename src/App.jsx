import { useState, useEffect } from 'react'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar/navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/signup';
import Login from './Components/Login/login';
import Notification from "./Components/Notification/Notification";
import Services from './Components/Services/services';
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation.jsx"
import FindDoctor from './Components/Appointment/FindDoctor.jsx';
import Appointment from './Components/Appointment/appointment.jsx';
import RedNotification from './Components/Notification/redNotification.jsx';
import AptNotification from './Components/AptNotification/AptNotification.jsx';

function App() {
  const [count, setCount] = useState(0)
  const [isLogged, setIsLogged] = useState(() => {
    return sessionStorage.getItem("auth-token") ? true : false;
  });
  const [name, setName] = useState(() => {
    return sessionStorage.getItem("name") || "";
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const showNotification = (msg, duration = 2000) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, duration);
  };
  const showRedNotification = (msg, duration = 2000) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, duration);
  };
  const [appointments, setAppointments] = useState(() => {
  const stored = localStorage.getItem("appointments");
    return stored ? JSON.parse(stored) : [];
  });


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const saveAppointments = (updated) => {
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };
  return (
    <>
      <div className="App">
        <BrowserRouter>
            <NavBar isLogged={isLogged} setIsLogged={setIsLogged} showNotification={showNotification} name={name}/>
            <Notification message={notification.message} show={notification.show} />
            <AptNotification  appointments={appointments} setAppointments={saveAppointments} />
            <Routes >
                <Route path='/Doctor-Appointment-Front-End/' element={<LandingPage/>} isLogged={isLogged} setIsLogged={setIsLogged}/>
                <Route path='/Doctor-Appointment-Front-End/signup' element={<SignUp showNotification={showNotification} isLogged={isLogged} setIsLogged={setIsLogged} setName={setName}/>}/>
                <Route path='/Doctor-Appointment-Front-End/login' element={<Login showNotification={showNotification} isLogged={isLogged} setIsLogged={setIsLogged} setName={setName}  />} />
                <Route path='/Doctor-Appointment-Front-End/services' element={<Services />} />
                <Route path="/Doctor-Appointment-Front-End/instant-consultation" element={<InstantConsultation />} />
                <Route path="/Doctor-Appointment-Front-End/appointment" element={<Appointment appointments={appointments} setAppointments={setAppointments} showRedNotification={showRedNotification} showNotification={showNotification}/>} />
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
