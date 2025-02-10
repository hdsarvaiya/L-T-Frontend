// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import EditInventory from '../components/EditInventory'; // A separate component for editing
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [inventory, setInventory] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Fetch Inventory Data
//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const res = await axios.get('https://landt-maintain-production.up.railway.app/api/inventory');
//         setInventory(res.data);
//       } catch (err) {
//         alert('Error fetching inventory');
//       }
//     };

//     fetchInventory();
//   }, []);

//   // Handle item selection for editing
//   const handleEdit = (item) => {
//     setSelectedItem(item);
//   };

//   // Send immediate email reminder
//   const handleSendEmail = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/api/inventory/send-email/${id}`);
//       alert('Maintenance reminder email sent successfully!');
//     } catch (err) {
//       console.error("Error sending immediate email:", err);
//       alert('Failed to send email');
//     }
//   };
  

//   return (
//     <div className="dashboard">
//       <h2>Dashboard</h2>
//       <Link to="/add-inventory">
//   <button>Add New Inventory</button>
// </Link>
//       <table>
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Type</th>
//             <th>Last Maintenance</th>
//             <th>Interval (Months)</th>
//             <th>Responsible</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventory.map((item) => (
//             <tr key={item._id}>
//               <td>{item.name}</td>
//               <td>{item.type}</td>
//               <td>{new Date(item.lastMaintenance).toLocaleDateString()}</td>
//               <td>{item.maintenanceInterval}</td>
//               <td>{item.responsiblePerson}</td>
//               <td>{item.email}</td>
//               <td>
//                 <button onClick={() => handleEdit(item)}>Edit</button>
//                 {/* Send Now Button */}
//                 <button 
//                   onClick={() => handleSendEmail(item._id)} 
//                   style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
//                 >
//                   Send Now
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedItem && (
//         <EditInventory item={selectedItem} onUpdate={() => setSelectedItem(null)} />
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";
import EditInventory from "../components/EditInventory"; // Component for editing inventory
import { Link } from "react-router-dom";
import "../styles/dashboard.css"

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fetch Inventory Data
  
    const fetchInventory = async () => {
      try {
        const res = await axios.get("https://landt-maintain-production.up.railway.app/api/inventory");
        setInventory(res.data);
      } catch (err) {
        alert("Error fetching inventory");
      }
    };

    useEffect(() => {
    fetchInventory();
  }, []);

  // Handle item selection for editing
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };



  const handleCloseEdit = async () => {
    setIsEditOpen(false);
    setSelectedItem(null);
    await fetchInventory(); // Refresh inventory list
  };
  

  // Send immediate email reminder
  const handleSendEmail = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/inventory/send-email/${id}`);
      alert("Maintenance reminder email sent successfully!");
    } catch (err) {
      console.error("Error sending immediate email:", err);
      alert("Failed to send email");
    }
  };

  // Filter inventory based on search term
  const filteredInventory = inventory.filter((item) =>
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.responsiblePerson && item.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.Item_id && String(item.Item_id).includes(searchTerm))
  );
  

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Inventory Dashboard</h2>
        <div className="dashboard-actions">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <Link to="/add-inventory">
            <button className="add-button">+ Add Inventory</button>
          </Link>
        </div>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Item ID</th>
            <th>Location</th>
            <th>Last Maintenance</th>
            <th>Interval (Months)</th>
            <th>Responsible</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.Item_id}</td>
                <td>{item.location}</td>
                <td>{new Date(item.lastMaintenance).toLocaleDateString()}</td>
                <td>{item.maintenanceInterval}</td>
                <td>{item.responsiblePerson}</td>
                <td>{item.email}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="send-button" onClick={() => handleSendEmail(item._id)}>Send Now</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Show EditInventory Modal */}
      {isEditOpen && selectedItem && (
        <EditInventory 
          item={selectedItem} 
          onUpdate={handleCloseEdit} 
          onClose={handleCloseEdit} 
        />
      )}
    </div>
  );
};

export default Dashboard;
