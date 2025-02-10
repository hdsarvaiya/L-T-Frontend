import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://landt-maintain-production.up.railway.app/api/auth/register", formData);
      alert("Registration Successful!");
      navigate("/");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="register-container">
      <img 
        src="/png-transparent-larsen-toubro-architectural-engineering-lucknow-business-l-t-construction-hq-business-text-people-logo-removebg-preview.png" 
        alt="L&T Logo" 
        className="logo"
      />
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="input-field" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input-field" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input-field" />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
