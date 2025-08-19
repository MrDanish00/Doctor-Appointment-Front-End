import { Link, Navigate, useNavigate } from "react-router-dom";
import SignUp from "../Sign_Up/signup";
import "./navbar.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";

function NavBar({showNotification,isLogged, setIsLogged, name,setName}) {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [showProfile,setShowProfile] = useState(false);
    const navigate = useNavigate();
    // const links = document.querySelectorAll('.nav-link');

    // links.forEach(link => {
    //     link.addEventListener('click', () => {
    //         // Remove active class from all
    //         links.forEach(l => l.classList.remove('active'));
    //         // Add active class to clicked one
    //         link.classList.add('active');
    //     });
    // });

    // const [name, setName] = useState("");
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLogged(false);
        // setUsername("");
        showNotification("User Logged Out Successfully!")
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        navigate("/Doctor-Appointment-Front-End/");
        
    }
    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");
      const storedName = sessionStorage.getItem("name");
      if (storedemail && storedName) {
            setIsLogged(true);
            setName(storedName);
            setUserName(storedemail);
          }
        }, [setIsLogged]);
    return (
        <>
            <nav className="nav-bar" > 
                <div className="nav-div-1">
                    <h1>StayHealthy</h1>
                    <i className="fas fa-user-md"></i>
                </div>



                <div className="nav-div" id="nav-menu">
                    <ul className="nav-items">
                    
                        <li><NavLink to={"/Doctor-Appointment-Front-End/"}end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
                        <li><NavLink to="/Doctor-Appointment-Front-End/appointment" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Appointments</NavLink></li>
                        <li><NavLink to="/Doctor-Appointment-Front-End/instant-consultation" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Instant Consults</NavLink></li>
                        <li>
                            {isLogged ? (
                                <NavLink to="/Doctor-Appointment-Front-End/reviews" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Reviews</NavLink>
                            ) : (
                                <NavLink to="/Doctor-Appointment-Front-End/login" style={{color:"black",border:"none"}} className={"nav-link"}>Reviews</NavLink>
                            )}
                        </li>
                        {/* <button onClick={setIsLogged(true)}>check</button> */}
                    </ul>
                    {isLogged ? (
                        <>
                        <div className="logout-btn">
                            <h3 style={{cursor:"pointer"}} onClick={()=>setShowProfile(!(showProfile))}>Welcome, {name}</h3>
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                        <div className="hamburger" id="hamburger">
                            <i className="fas fa-bars"></i>
                        </div>
                        </>

                    ) : (
                        <>
                        <div className="nav-div-2">
                            <Link to={"/Doctor-Appointment-Front-End/signup"}> <button>Sign Up</button></Link>
                            <Link to={"/Doctor-Appointment-Front-End/login"}><button>Login</button></Link>
                        </div>
                        <div className="hamburger" id="hamburger">
                            <i className="fas fa-bars"></i>
                        </div>
                        </>
                    )
                    }
                    
                    
                </div>
                <ul className="nav-items-2">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Appointments</a></li>
                    <li><a href="#">Health Blogs</a></li>
                    <li><a href="#">Reviews</a></li>
                </ul>
            </nav><br /><br /><br /><br />
            {showProfile && (
                <div className="profile-div">
                    <a href="/Doctor-Appointment-Front-End/profile" style={{fontSize:"1.6rem",margin:"0.4rem"}}>Your Profile</a>
                    <a href="#" style={{fontSize:"1.6rem",margin:"0.4rem"}}>Your Reports</a>
                </div>
            )}
        </>
    )
}

export default NavBar;