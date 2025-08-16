import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import {API_URL} from "../../config.js"
function Login({showNotification, isLogged, setIsLogged, setName}){
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        console.log("Hello");
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });
    
        const json = await response.json();
    
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("email", email);
            setIsLogged(true);
            setName(json.name);
            showNotification("User Logged In Successfully!");
          setTimeout(() => {
            navigate("/Doctor-Appointment-Front-End/");
          }, 2000);}
           else {
            // Properly handle errors as an array
            if (json.errors) {
                setErrors(json.errors);
            } else if (json.error) {
                // Ensure json.error is an array of objects
                if (Array.isArray(json.error)) {
                    setErrors(json.error);
                } else {
                    setErrors([{ msg: json.error }]);
                }
            }
        }
    };


    return(
        <>
        <form action="POST" onSubmit={login}>

            <div className="login-div">
                <h1>Login</h1>
                <div className="login-div-1">
                    <p className="p-tag">Are you a new Member? </p>
                    <a className="a-tag" href="/Doctor-Appointment-Front-End/signup">Sign Up Here</a><br /><br />
                </div><br />
                <div className="login-form">
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email" placeholder="Enter Your Email" required /><br /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="Enter Your Password" required /><br /><br /><br />

                    {errors && Array.isArray(errors) && errors.map((err, index) => (
                        <p key={index} style={{ color: 'red' }}>{err.msg}</p>
                    ))}
                    <div>
                    <button className="login-btn">Login</button>
                    <button className="reset-btn">Reset</button>

                    </div>
                    <a className="forget-password" href="#">Forget Password?</a>
                    
                </div>
            </div>
            
        </form>
        </>
    )
}

export default Login;