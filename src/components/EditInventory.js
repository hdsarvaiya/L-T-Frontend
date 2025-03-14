import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/EditInventory.css";

const apiUrl = process.env.REACT_APP_REACT_URL;

const EditInventory = ({ itemId, onUpdate, onClose }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [formData, setFormData] = useState({
    maintenanceInterval: '',
    email: '',
  });

  // Fetch item data when the component loads
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/inventory/${itemId}`);
        setItem(response.data);
        setFormData({
          maintenanceInterval: response.data.maintenanceInterval || '',
          email: response.data.email || '',
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch inventory item:', err);
        setError('Failed to fetch item. Please try again later.');
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/inventory/${itemId}`, formData);
      onUpdate(); // Refresh inventory list
      alert('Inventory updated successfully!');
      onClose(); // Close the modal after update
    } catch (err) {
      alert('Error updating inventory');
    }
  };

  // Handle loading state
 

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Edit {item?.name || 'Item'}</h3>
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
