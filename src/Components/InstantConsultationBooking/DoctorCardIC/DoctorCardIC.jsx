import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC.jsx'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import AptNotification from '../../AptNotification/AptNotification.jsx';

const DoctorCardIC = ({isLogged,setIsLogged,showNotification, name, speciality, experience, ratings, profilePic, appointments,setAppointments }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAptNotification,setShowAptNotification] = useState(true);
  const navigate = useNavigate();
  const handleBooking = () => {
    setShowModal(true);
  };

  useEffect(() => {
      const storedUsername = sessionStorage.getItem("email");
      setIsLogged(!!storedUsername);
  }, []);

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      doctorName: name,
      doctorSpeciality: speciality,
      review: [],
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments); // this updates App.jsx + localStorage
    setShowModal(false);
    showNotification("Appointment booked!");
    setShowAptNotification(true);
  };
  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((apt) => apt.id !== appointmentId);
    setAppointments(updatedAppointments); // update global
    if (updated.length === 0) {
      setShowAptNotification(false);
    }
    showNotification("Appointment cancelled!");

  };
  const hasAppointmentWithThisDoctor = appointments.some(
    (apt) => apt && apt.doctorName === name
  );

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        {/* for reference  */}
        {/* <div>
              <button className='book-appointment-btn'>                    
                <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
              </div> */}
      </div>


      <div className="doctor-card-options-container">
       <Popup
          overlayStyle={{marginTop:"7rem"}}
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button  className={`book-appointment-btn ${hasAppointmentWithThisDoctor ? 'cancel-appointment' : ''}`}>
              {hasAppointmentWithThisDoctor ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            isLogged ? (
              <div className="doctorbg" style={{ height: '70vh', overflow: 'scroll', marginTop: "5rem" }}>
                <div>
                  <div className="doctor-card-profile-image-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                  </div>
                </div>

                {appointments.length > 0 ? (
                  hasAppointmentWithThisDoctor ? (
                    <div>
                      {showAptNotification && <AptNotification />}
                      <h3 className='h3' style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                      {appointments.map((appointment) => (
                        <div className="bookedInfo" key={appointment.id}>
                          <p><b>Name:</b> {appointment.name}</p>
                          <p><b>Phone:</b> {appointment.phoneNumber}</p>
                          <button className='cancel-apt-btn' onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                  )
                ) : (
                  <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                )}
              </div>
            ) : (
              navigate("/Doctor-Appointment-Front-End/login")
            )
          )}

        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCardIC;
