import "./appointment.css"

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FindDoctor from "./FindDoctor";
import DoctorCard from "./DoctorCard";

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]
function Appointment({showNotification,showRedNotification,appointments,setAppointments}){
    const [hide, setHide] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setHide(true);
        navigate(`/Doctor-Appointment-Front-End//appointment?speciality=${speciality}`);
        window.location.reload();
    }

    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            if (searchParams.get('speciality')) {
                // window.reload()
                const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());

                setFilteredDoctors(filtered);
                
                setIsSearched(true);
                
            } else {
                setFilteredDoctors([]);
                setIsSearched(false);
            }
            setDoctors(data);
        })
        .catch(err => console.log(err));
    }

    const handleSearch = (searchText) => {
    
            if (searchText === '') {
                setFilteredDoctors([]);
                setIsSearched(false);
                } else {
                    
                const filtered = doctors.filter(
                    (doctor) =>
                    // 
                    doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
                    
                );
                    
                setFilteredDoctors(filtered);
                setIsSearched(true);
                window.location.reload()
            }
        };
        
        useEffect(() => {
            getDoctorsDetails();
            // const authtoken = sessionStorage.getItem("auth-token");
            // if (!authtoken) {
            //     navigate("/login");
            // }
        }, [searchParams])
    return(
        <>
            <div  className="searchpage-container">
            <FindDoctor showRedNotification={showRedNotification} showNotification={showNotification} onSearch={handleSearch} />
            <div className="search-results-container">
            {isSearched ? (
                <center>
                    <h2 style={{fontSize:"2.5rem"}}>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                    <h3 style={{fontSize:"2rem"}}>Book appointments with minimum wait-time & verified doctor details</h3>
                    {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => <DoctorCard appointments={appointments} setAppointments={setAppointments} showRedNotification={showRedNotification} showNotification={showNotification} className="doctorcard" {...doctor} key={doctor.name} />)
                    ) : (
                    <p>No doctors found.</p>
                    )}
                </center>
                ) : (
                ''
                )}
            </div>
        </div>
                        
        </>
    )
}

export default Appointment;