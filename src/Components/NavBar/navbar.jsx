import "./navbar.css";

function NavBar() {
    return (
        <>
            <nav className="nav-bar">
                <div className="nav-div-1">
                    <h1>StayHealthy</h1>
                    <i className="fas fa-user-md"></i>
                </div>



                <div className="nav-div" id="nav-menu">
                    <ul className="nav-items">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Appointments</a></li>
                        <li><a href="#">Health Blogs</a></li>
                        <li><a href="#">Reviews</a></li>
                    </ul>
                    <div className="nav-div-2">
                        <button>Sign Up</button>
                        <button>Login</button>
                    </div>
                    <div className="hamburger" id="hamburger">
                        <i className="fas fa-bars"></i>
                    </div>
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