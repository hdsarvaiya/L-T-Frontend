// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Register.css";

// const Register = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState(""); // Store error message
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", formData);
//       alert("Registration Successful!");
//       navigate("/");
//     } catch (err) {
//       if (err.response && err.response.status === 400) {
//         setError("User already exists. Redirecting to login...");
//         setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
//       } else {
//         setError("Error registering user. Try again.");
//       }
//     }
//   };

//   return (
//     <div className="register-container">
//       <img 
//         src="/png-transparent-larsen-toubro-architectural-engineering-lucknow-business-l-t-construction-hq-business-text-people-logo-removebg-preview.png" 
//         alt="L&T Logo" 
//         className="logo"
//       />
//       <h2>Register</h2>
//       <form className="register-form" onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="input-field" />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input-field" />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input-field" />
//         <button type="submit" className="register-button">Register</button>
//       </form>
//       {error && <p className="error-message">{error}</p>}  {/* Show error message */}
//       <p className="login-link">
//         Already have an account? <span onClick={() => navigate("/")}>Login</span>
//       </p>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"; // Import your CSS 
import logo from "../components/logo.png"
import Login from "./Login";
const apiUrl = process.env.REACT_APP_REACT_URL;



const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Used for navigation after registration

  // Handle input change and update formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending registration data to backend API
      await axios.post(`${apiUrl}/api/auth/register`, formData);
      alert("Registration Successful!"); // Alert success message
      navigate("/"); // Redirect to login page
    } catch (err) {
      // Handle errors, such as user already existing
      if (err.response && err.response.status === 400) {
        setError("User already exists. Redirecting to login...");
        setTimeout(() => navigate("/"), 2000); // Redirect to login page after 2 seconds
      } else {
        setError("Error registering user. Try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <img 
        src={logo}// Your logo image source
        alt="Logo"
        className="logo"
      />
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          onChange={handleChange} 
          required 
          className="input-field" 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          className="input-field" 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          className="input-field" 
        />
        <button type="submit" className="register-button">Register</button>
      </form>
      
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      
      <p className="login-link">
        Already have an account? <span onClick={() => navigate("/")}>Login</span>
      </p>
    </div>
  );
};

export default Register;
