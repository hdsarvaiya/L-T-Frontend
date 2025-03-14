import React from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_REACT_URL;

const InventoryItem = ({ item }) => {

  // Function to send email immediately
  const handleSendEmail = async (id) => {
    try {
      await axios.post(`${apiUrl}/api/inventory/send-email/${id}`);
      alert('Maintenance reminder email sent successfully!');
    } catch (err) {
      console.error("Error sending immediate email:", err);
      alert('Failed to send email');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <div>
        <h3>{item.itemName}</h3>
        <p>Item ID {item.Item_id}</p>
        <p>Location {item.location}</p>
        <p>Last Maintenance: {item.lastMaintenance}</p>
        <p>Maintenance Interval: {item.maintenanceInterval} months</p>
        <p>Responsible Person: {item.responsiblePerson}</p>
        <p>Email: {item.email}</p>
      </div>

      {/* Button to send email immediately */}
      <button 
        onClick={() => handleSendEmail(item._id)} 
        style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Send Now
      </button>
    </div>
  );
};

export default InventoryItem;
