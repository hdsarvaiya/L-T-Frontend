import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/addInventory.css"

const AddInventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    Item_id:"",
    location: "",
    lastMaintenance: "",
    maintenanceInterval: "",
    responsiblePerson: "",
    email: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/inventory/add", formData);
      alert("Inventory added successfully!");
      navigate("/dashboard"); // Redirect to dashboard after adding
    } catch (error) {
      alert("Failed to add inventory. Please try again.");
    }
  };

  return (
    <div className="add-inventory-container">
      <h2>Add New Inventory</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-group">
          <label>Item Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Item Id:</label>
          <input type="number" name="Item_id" value={formData.Item_id} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Last Maintenance Date:</label>
          <input type="date" name="lastMaintenance" value={formData.lastMaintenance} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Maintenance Interval (Months):</label>
          <input type="number" name="maintenanceInterval" value={formData.maintenanceInterval} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Responsible Person:</label>
          <input type="text" name="responsiblePerson" value={formData.responsiblePerson} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Add Inventory</button>
      </form>
    </div>
  );
};

export default AddInventory;
