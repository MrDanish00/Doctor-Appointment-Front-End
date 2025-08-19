import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearchIC = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Filter specialities based on input text
  const filteredSpecialities = initSpeciality.filter((spec) =>
    spec.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDoctorSelect = (speciality) => {
    setSearchText(speciality);
    setShowSuggestions(false);
    onSearch(speciality);
    navigate(
      `/Doctor-Appointment-Front-End/instant-consultation?speciality=${speciality}`
    );
  };

  const handleSearchClick = () => {
    if (searchText.trim()) {
      onSearch(searchText);
      navigate(
        `/Doctor-Appointment-Front-End/instant-consultation?speciality=${searchText}`
      );
    }
  };

  return (
    <div className="finddoctor">
      <center>
        <h1 style={{ fontSize: '2.5rem' }}>
          Find a doctor and Consult instantly
        </h1>
        <br />
        <div>
          <i
            style={{ color: '#000000', fontSize: '20rem' }}
            className="fa fa-user-md"
          ></i>
          <br />
        </div>

        <div
          className="home-search-container"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="doctor-search-box">
            <br />
            <br />
            <div style={{ display: 'block', width: '100%', position: 'relative' }}>
              <input
                className="search-doctor-input-box"
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                placeholder="Search doctors by speciality"
              />
              <button className="search-doctor-btn" onClick={handleSearchClick}>
                &#128269;
              </button>
              <br />
              <br />

              {/* Dropdown Suggestions */}
              {showSuggestions && filteredSpecialities.length > 0 && (
                <div className="search-doctor-input-results">
                  {filteredSpecialities.map((speciality) => (
                    <div
                      className="search-doctor-result-item"
                      key={speciality}
                      onMouseDown={() => handleDoctorSelect(speciality)}
                    >
                      <span>&#x1F50D;</span>
                      <span>{speciality}</span>
                      <span>SPECIALITY</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearchIC;
