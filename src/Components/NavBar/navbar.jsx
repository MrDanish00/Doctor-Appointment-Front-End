import { Link, Navigate } from "react-router-dom";
import SignUp from "../Sign_Up/signup";
import "./navbar.css";
import { useState, useEffect } from "react";


function NavBar({showNotification,isLogged, setIsLogged, name}) {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
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
            <nav className="nav-bar">
                <div className="nav-div-1">
                    <h1>StayHealthy</h1>
                    <i className="fas fa-user-md"></i>
                </div>



                <div className="nav-div" id="nav-menu">
                    <ul className="nav-items">
                        <li><a href="/Doctor-Appointment-Front-End/">Home</a></li>
                        <li><a href="#">Appointments</a></li>
                        <li><a href="/Doctor-Appointment-Front-End/instant-consultation">Instant Consults</a></li>
                        <li><a href="#">Reviews</a></li>
                        {/* <button onClick={setIsLogged(true)}>check</button> */}
                    </ul>
                    {isLogged ? (
                        <>
                        <div className="logout-btn">
                            <h3>Welcome, {name}</h3>
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
        </>
    )
}

export default NavBar;