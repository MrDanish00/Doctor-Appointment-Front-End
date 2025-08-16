import { useState } from "react";
import "./AptNotification.css";
const AptNotification = ({ appointments, setAppointments }) => {
  const [open, setOpen] = useState(false);

  const cancelAppointment = (id) => {
    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated)); // keep storage updated
  };

  return (
    <div>
      {/* Floating button (always visible) */}
      <button 
        style={{
          position: "fixed",
          bottom: "2%",
          right: "2%",
          padding: "1.5rem",
          background: "#007bff",
          color: "white",
          borderRadius: "2rem",
          border: "none",
          cursor: "pointer",
          zIndex: 9999
        }}
        onClick={() => setOpen(!open)}
      >
        🔔 Notifications ({appointments?.length || 0})
      </button>

      {/* Notification Panel */}
      {open && (
        <div className="apt-notify" style={{
          position:"fixed", top:"50%", right:"1rem", fontSize:"1.6rem",
          border:"1px solid #ccc", padding:"2rem", width:"30%", height:"40%",
          borderRadius:"0.5rem", boxShadow:"0px 4px 6px rgba(0,0,0,0.5)" 
        }}>

          {appointments && appointments.length > 0 ? (
              appointments.map((apt) => (
                <div key={apt.id} style={{borderBottom:"1px solid #eee", marginBottom:"0.5rem"}}>
                  <h3 style={{textAlign:"center"}}>Appointment Details</h3>
                <p style={{margin:"0.5rem"}}><b>Doctor: </b> - {apt.doctorName}</p>
                <p style={{margin:"0.5rem"}}><b>Speciality: </b> - {apt.doctorSpeciality}</p>
                <p style={{margin:"0.5rem"}}><b>Name: </b> - {apt.name}</p>
                <p style={{margin:"0.5rem"}}><b>Phone Number: </b> - {apt.phoneNumber}</p>
                <p style={{margin:"0.5rem"}}><b>Date of Appointment: </b> - {apt.date}</p>
                <p style={{margin:"0.5rem"}}><b>Time Slot: </b> - {apt.time}</p>
                <button 
                  onClick={() => cancelAppointment(apt.id)}
                  style={{color:"red", border:"none", background:"transparent", cursor:"pointer"}}
                >
                  ❌ Cancel
                </button>
              </div>
            ))
          ) : (
            <p>No appointments booked</p>
          )}

          <button 
            onClick={() => setOpen(false)} 
            style={{marginTop:"1rem", background:"#007bff", color:"white", border:"none", padding:"0.5rem 1rem", borderRadius:"0.3rem", cursor:"pointer"}}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AptNotification;
