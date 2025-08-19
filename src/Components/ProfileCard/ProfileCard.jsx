import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "./ProfileCard.css"
import {API_URL} from "../../config.js"

function ProfileCard({showNotification,isLogged, setIsLogged,name,setName,appointments,setAppointments}){
    const email = sessionStorage.getItem("email");
    const phone = sessionStorage.getItem("phone");
    const [viewProfile,setViewProfile] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isLogged){
            setViewProfile(true)
        }
        else{
            navigate("/Doctor-Appointment-Front-End/login");
        }
    },[])
    const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  
  // Access the navigation functionality from React Router

  
  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/Doctor-Appointment-Front-End/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);
  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage
      if (!authtoken) {
        navigate("/Doctor-Appointment-Front-End/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email, // Add the email to the headers
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          // Handle error case
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };
  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(true);
  };
  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };
  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const authtoken = sessionStorage.getItem("auth-token");
    const email = sessionStorage.getItem("email");
    if (!authtoken || !email) {
      navigate("/Doctor-Appointment-Front-End/login");
      return;
    }

    const payload = { 
      email: email, 
      name: updatedDetails.name, 
      phone: updatedDetails.phone 
    };

    const response = await fetch(`${API_URL}/api/auth/user`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${authtoken}`,
        "Content-Type": "application/json",
        "Email": email,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      setName(updatedDetails.name);
      showNotification("Profile Updated Successfully!")
      navigate("/Doctor-Appointment-Front-End/");
    } else {
      const errMsg = await response.text();
      console.error("Update failed:", errMsg);
      alert("Failed to update profile: " + errMsg);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong: " + error.message);
  }
};


    return(
        <>
    
      {editMode ? (
        <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              disabled // Disable the email field
            />
          </label>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={updatedDetails.phone} 
              onChange={handleInputChange}
            />
          </label><br /><br />
          {/* Create similar logic for displaying and editing name and phone from userDetails */}
          <button type="submit" className="edit-btn" onClick={(e)=>handleSubmit(e)}>Save</button>
        </form>
        </div>
      ) : (
            <div className="profile-card">
                <div className="profile-card-inner">
                    <h1 style={{marginTop:"2rem",padding:"1rem",fontSize:"3rem"}}>Welcome, {userDetails.name}</h1>
                    <div style={{textAlign:"left",width:"90%",margin:"auto"}}>
                        <h2 style={{fontSize:"2rem"}}>Email: <span style={{fontWeight:"500"}}>{userDetails.email}</span></h2>
                        <h2 style={{fontSize:"2rem"}}>Phone: <span style={{fontWeight:"500"}}>{userDetails.phone}</span></h2>
                    </div>
                        <button className="edit-btn" onClick={handleEdit}>Edit</button>
                </div>
            </div>
      )}

        </>
    )
}

export default ProfileCard;