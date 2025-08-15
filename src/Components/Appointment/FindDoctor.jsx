import "./appointment.css"
import doctorImage from "../../assets/Images/Doctor10.png"
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]
function FindDoctor({showNotification}){
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
        navigate(`/Doctor-Appointment-Front-End/appointment?speciality=${speciality}`);
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
                window.reload()
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
            <div className="appointment-div">
                
                
                        
                    <div className="apt-search-box">
                        <div >

                            <h1 style={{paddingTop:"5%"}}>Find a doctor at your own ease <br /><p className="p-tag"></p></h1>
                        </div>
                            
                
                            <img className="doctor-img"  src={doctorImage} alt="Doctor Image" />
                        <div style={{display:"block",width:"100%"}}>
                            <input className="search-doctor" type="text" onFocus={()=>setHide(false)} onBlur={()=>setHide(true)} id="apt-search" name="" placeholder="Search doctors by speciality" />
                            <button className="search-doctor-btn">&#128269;</button><br /><br />
                        </div>
                            <div className="apt-doctor-input-results" hidden={hide}>
                            {
                                specialities.map(speciality => <div className="apt-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                    <span>&#x1F50D;</span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>)
                            }
                            </div>
                    </div>
        </div>
                        
        </>
    )
}

export default FindDoctor;