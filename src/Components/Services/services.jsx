import "./services.css";
import service1 from"../../assets/Images/instant consult.avif";
import service2 from"../../assets/Images/Appointment.jpg";
import service3 from"../../assets/Images/self check up.avif";
import service4 from"../../assets/Images/Tops.avif";
import { NavLink } from "react-router-dom";
function Services(){
    return(
        <>
            <div className="services-div">
                <h1>Best Services</h1>
                <p>Love yourself enough to live a healthy life</p><br /><br />
                <div className="services-div-1">
                    <div className="services">
                        <a href="/Doctor-Appointment-Front-End/instant-consultation">
                            <img className="services-img" src={service1} alt="Insant Consultation" />
                        </a><br />
                        <h2>Instant Consulation</h2>
                    </div>
                    <div className="services">
                        <a href="/Doctor-Appointment-Front-End/appointment">
                            <img className="services-img" src={service2} alt="Book an Appointment" />
                        </a><br />
                        <h2>Book an Appointment</h2>
                    </div>
                    <div className="services">
                        <a href="/Doctor-Appointment-Front-End/self-check-up">
                            <img className="services-img" src={service3} alt="Self Check Up" />
                        </a><br />
                        <h2>Self Check Up</h2>
                    </div>
                    <div className="services">
                        <a href="/Doctor-Appointment-Front-End/health-tips">
                            <img className="services-img" src={service4} alt="Health Tips" />
                        </a><br />
                        <h2>Health Tips</h2>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Services;