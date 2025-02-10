import React, { useState } from 'react';
import axios from 'axios';
import "../styles/EditInventory.css"

const EditInventory = ({ item, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    maintenanceInterval: item.maintenanceInterval,
    email: item.email,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/inventory/${item._id}`, formData);
      onUpdate(); // Refresh inventory list
      alert('Inventory updated successfully!');
      onClose(); // Close the modal after update
    } catch (err) {
      alert('Error updating inventory');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Edit {item.name}</h3>
        <form onSubmit={handleSubmit} className="edit-form">
          <div>
            <label>Maintenance Interval (Months):</label>
            <input
              type="number"
              name="maintenanceInterval"
              value={formData.maintenanceInterval}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label>Responsible Person's Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="update-button">Update</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInventory;
