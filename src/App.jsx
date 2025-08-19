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
import ReviewForm from './Components/ReviewForm/ReviewForm.jsx';
import ProfileCard from './Components/ProfileCard/ProfileCard.jsx';

function App() {
  const [count, setCount] = useState(0)
  const [isLogged, setIsLogged] = useState(() => {
    return sessionStorage.getItem("auth-token") ? true : false;
  });

  const email = sessionStorage.getItem("email");
 
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") || "";
  });
  useEffect(() => {
    if (name) {
      localStorage.setItem("name", name);
    }
  }, [name]);
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
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
  if (!email) {
    setAppointments([]); // clear appointments on logout
    return;
  }

  const stored = localStorage.getItem(`appointments_${email}`);
  const parsed = stored ? JSON.parse(stored) : [];
  setAppointments(parsed.filter((apt) => apt && apt.doctorName)); // remove nulls
}, [email]);




  const saveAppointments = (updated) => {
    setAppointments(updated);
    const email = sessionStorage.getItem("email");
    localStorage.setItem(`appointments_${email}`, JSON.stringify(updated));
  };
  return (
    <>
      <div className="App">
        <BrowserRouter>
            <NavBar isLogged={isLogged} setIsLogged={setIsLogged} showNotification={showNotification} name={name} setName={setName}/>
            <Notification message={notification.message} show={notification.show} />
            <AptNotification isLogged={isLogged} setIsLogged={setIsLogged}  appointments={appointments} setAppointments={saveAppointments} />
            <Routes >
                <Route path='/Doctor-Appointment-Front-End/' element={<LandingPage/>} isLogged={isLogged} setIsLogged={setIsLogged}/>
                <Route path='/Doctor-Appointment-Front-End/signup' element={<SignUp showNotification={showNotification} isLogged={isLogged} setIsLogged={setIsLogged} setName={setName}/>}/>
                <Route path='/Doctor-Appointment-Front-End/login' element={<Login showNotification={showNotification} isLogged={isLogged} setIsLogged={setIsLogged} setName={setName}  />} />
                <Route path='/Doctor-Appointment-Front-End/services' element={<Services />} />
                <Route path="/Doctor-Appointment-Front-End/instant-consultation" element={<InstantConsultation />} />
                <Route path="/Doctor-Appointment-Front-End/appointment" element={<Appointment isLogged={isLogged} setIsLogged={setIsLogged} appointments={appointments} setAppointments={saveAppointments} showRedNotification={showRedNotification} showNotification={showNotification}/>} />
                <Route path='/Doctor-Appointment-Front-End/reviews' element={<ReviewForm isLogged={isLogged} setIsLogged={setIsLogged} appointments={appointments} setAppointments={saveAppointments} showNotification={showNotification}/>} />
                <Route path='/Doctor-Appointment-Front-End/profile' element={<ProfileCard showNotification={showNotification} isLogged={isLogged} setIsLogged={setIsLogged} name={name} setName={setName} appointments={appointments} setAppointments={saveAppointments}/>} />
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
