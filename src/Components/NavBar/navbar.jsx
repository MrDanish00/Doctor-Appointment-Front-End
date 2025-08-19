import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

function NavBar({ showNotification, isLogged, setIsLogged, name, setName }) {
  const [email, setEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("doctorData");
    setIsLogged(false);
    showNotification("User Logged Out Successfully!");

    // clear review form data
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    });

    setEmail("");
    navigate("/Doctor-Appointment-Front-End/");
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedName = sessionStorage.getItem("name");
    if (storedEmail && storedName) {
      setIsLogged(true);
      setName(storedName);
      setEmail(storedEmail);
    }
  }, [setIsLogged, setName]);

  return (
    <nav className="nav-bar">
      {/* Left Side */}
      <div className="nav-div-1">
        <h1>StayHealthy</h1>
        <i className="fas fa-user-md"></i>
      </div>

      {/* Right Side */}
      <div className="nav-div">
        {/* Desktop Nav Links */}
        <ul className="nav-items">
          <li>
            <NavLink
              to={"/Doctor-Appointment-Front-End/"}
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Doctor-Appointment-Front-End/appointment"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Appointments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Doctor-Appointment-Front-End/instant-consultation"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Instant Consults
            </NavLink>
          </li>
          <li>
            {isLogged ? (
              <NavLink
                to="/Doctor-Appointment-Front-End/reviews"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Reviews
              </NavLink>
            ) : (
              <NavLink
                to="/Doctor-Appointment-Front-End/login"
                style={{ color: "black", border: "none" }}
                className="nav-link"
              >
                Reviews
              </NavLink>
            )}
          </li>
        </ul>

        {/* Welcome message outside */}
        {isLogged && <h3 className="welcome-text" style={{cursor:"pointer"}} onClick={()=>setShowProfile(!showProfile)}>Welcome, {name}</h3>}
        
        {/* Desktop Auth Buttons */}
        {!isLogged && (
          <div className="nav-div-2 desktop-only">
            <Link to="/Doctor-Appointment-Front-End/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/Doctor-Appointment-Front-End/login">
              <button>Login</button>
            </Link>
          </div>
        )}

        {isLogged && (
          <div className="logout-btn desktop-only">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}

        {/* Hamburger Always (mobile only visible) */}
        <div
          onClick={() => setShowHamburger(!showHamburger)}
          className="hamburger"
        >
          <i className="fas fa-bars"></i>
        </div>
      </div>

      {/* Sidebar Menu */}
          <ul className={`nav-items-2 ${showHamburger ? "show" : ""}`}>
            <br />
              <li>
                  <NavLink to="/Doctor-Appointment-Front-End/" onClick={() => setShowHamburger(false)}>
                      Home
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/Doctor-Appointment-Front-End/appointment" onClick={() => setShowHamburger(false)}>
                      Appointments
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/Doctor-Appointment-Front-End/instant-consultation" onClick={() => setShowHamburger(false)}>
                      Instant Consults
                  </NavLink>
              </li>
              <li>
                  {isLogged ? (
                      <NavLink to="/Doctor-Appointment-Front-End/reviews" onClick={() => setShowHamburger(false)}>
                          Reviews
                      </NavLink>
                  ) : (
                      <NavLink to="/Doctor-Appointment-Front-End/login" onClick={() => setShowHamburger(false)}>
                          Reviews
                      </NavLink>
                  )}
              </li>
              <li>
                {isLogged && (
                    <NavLink to={"/Doctor-Appointment-Front-End/profile"} onClick={()=>setShowHamburger(false)} >
                        Your Profile
                    </NavLink>
                )}
              </li>
              <li>
                {isLogged && (
                    <NavLink to={"/Doctor-Appointment-Front-End/reports"} onClick={()=>setShowHamburger(false)} >
                        Your Reports
                    </NavLink>
                )}
              </li>
              <li>
                  {isLogged ? (
                      <button
                          className="logout-hamburger"
                          onClick={() => {
                              handleLogout();
                              setShowHamburger(false);
                          }}
                      >
                          Log Out
                      </button>
                  ) : (
                      <>
                          <Link to="/Doctor-Appointment-Front-End/signup" onClick={() => setShowHamburger(false)}>
                              <button className="auth-hamburger">Sign Up</button>
                          </Link>
                          <Link to="/Doctor-Appointment-Front-End/login" onClick={() => setShowHamburger(false)}>
                              <button className="auth-hamburger">Login</button>
                          </Link>
                      </>
                  )}
              </li>
          </ul>


      {/* Profile Dropdown */}
      {showProfile && (
        <div className="profile-div">
          <a
            href="/Doctor-Appointment-Front-End/profile"
            style={{ fontSize: "1.6rem", margin: "0.4rem" }}
          >
            Your Profile
          </a>
          <br />
          <a
            href="/Doctor-Appointment-Front-End/reports"
            style={{ fontSize: "1.6rem", margin: "0.4rem" }}
          >
            Your Reports
          </a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
