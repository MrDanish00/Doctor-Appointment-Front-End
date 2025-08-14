import "./signup.css"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {API_URL} from "../../config.js"
function SignUp({showNotification, setName}){
    const [value, setValue] = useState("");
    // const [showNotification, setShowNotification] = useState(false);

    const [errors, setErrors] = useState([]);
    const [name, setLocalName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); 
    const navigate = useNavigate(); 

    const handlePhone = (e)=>{
        if(e.target.value.length <= 10){
            setValue(e.target.value);
        }
    }

    const register = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
    });

    const json = await response.json();

    if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);
        
        setName(json.name);

        showNotification("User Registered Successfully!");
      setTimeout(() => {
        navigate("/login");
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
        <form action="POST" onSubmit={register}>


            <div className="login-div">
                <h1>Sign Up</h1>
                <div className="login-div-1">
                    <p>Already a Member? </p>
                    <a href="/login">Login</a><br /><br />
                </div><br />
            <div className="login-form">
                <label htmlFor="email">Role:</label><br />
                    <select name="role" id="role" className="list-box" defaultValue="">
                        <option value="" disabled>Select a Role</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select><br /><br />


                <label htmlFor="name">Name:</label><br />
                <input type="text" value={name} onChange={(e)=> setLocalName(e.target.value)} name="name" id="name" placeholder="Enter your name" required /><br /><br />

                <label htmlFor="phone">Phone:</label><br />
                <input type="tel" value={phone}  name="phone" id="phone" onChange={(e)=>setPhone(e.target.value)} maxLength={10} placeholder="Enter your phone number" required /><br /><br />

                <label htmlFor="email">Email:</label><br />
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter your email" required /><br /><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} id="password" placeholder="Enter your password" required /><br /><br /><br />

                {errors && Array.isArray(errors) && errors.map((err, index) => (
                    <p key={index} style={{ color: 'red' }}>{err.msg}</p>
                ))}




                <button className="login-btn">Submit</button><br /><br />
                <button className="reset-btn">Reset</button><br /><br />
                <a className="htmlForget-password" href="#">Forget Password?</a>
            </div>
            </div>
        </form>
            
        </>
    )
}

export default SignUp;