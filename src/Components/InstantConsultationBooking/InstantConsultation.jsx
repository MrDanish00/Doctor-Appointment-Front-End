import React, { useEffect, useState } from "react";
import "./InstantConsultation.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC.jsx";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC.jsx";

const InstantConsultation = ({isLogged,setIsLogged,showNotification,appointments,setAppointments}) => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const getDoctorsDetails = () => {
     // ✅ start loading
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        const speciality = searchParams.get("speciality");

        if (speciality) {
          const filtered = data.filter(
            (doctor) =>
              doctor.speciality.toLowerCase() === speciality.toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }

        setDoctors(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)); // ✅ stop loading
  };

  const handleSearch = (searchText) => {
    setLoading(true); // ✅ show loading when searching
    setTimeout(() => {
      if (searchText === "") {
        setFilteredDoctors([]);
        setIsSearched(false);
      } else {
        const filtered = doctors.filter((doctor) =>
          doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredDoctors(filtered);
        setIsSearched(true);
      }
      setLoading(false); // ✅ stop after search completes
    }, 500);
  };

  const navigate = useNavigate();

 useEffect(() => {
    if (searchParams.get("speciality")) {
        setLoading(true);
        getDoctorsDetails();
  } else {
        getDoctorsDetails(); // just fetch doctors silently
  }
}, [searchParams]);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC showNotification={showNotification} onSearch={handleSearch} isLogged={isLogged} setIsLogged={setIsLogged} appointments={appointments} setAppointments={setAppointments}/>
        <br />
        <br />
        <br />
        <br />

        <div className="search-results-container">
          {loading ? (
            <center>
              <h3
                style={{
                  fontSize: "2rem",
                  marginTop: "4rem",
                  color: "black",
                }}
              >
                Loading doctors...
              </h3>
            </center>
          ) : isSearched ? (
            filteredDoctors.length > 0 ? (
              <center>
                <h2 className="instant-text">
                  {filteredDoctors.length} doctors are available{" "}
                  {searchParams.get("location")}
                </h2>
                <h3 className="instant-text">
                  Book appointments with minimum wait-time & verified doctor
                  details
                </h3>
                {filteredDoctors.map((doctor) => (
                  <DoctorCardIC
                    className="doctorcard"
                    {...doctor}
                    key={doctor.name}
                    showNotification={showNotification}
                    isLogged={isLogged} setIsLogged={setIsLogged}
                    appointments={appointments} setAppointments={setAppointments}
                  />
                ))}
              </center>
            ) : (
              <h1>No Doctors Found</h1>
            )
          ) : null}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
