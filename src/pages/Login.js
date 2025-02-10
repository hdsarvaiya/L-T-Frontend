import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "../styles/Login.css"; // Import the CSS file

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", formData);
        localStorage.setItem("token", res.data.token);
        const user = jwtDecode(res.data.token);
        alert(`Welcome, ${user.name}`);
        navigate("/dashboard");
      } catch (err) {
        alert("Invalid credentials");
      }
    };
  
    return (
      <div className="login-container">
        <img src="/png-transparent-larsen-toubro-architectural-engineering-lucknow-business-l-t-construction-hq-business-text-people-logo-removebg-preview.png" 
             alt="L&T Logo" 
             className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;