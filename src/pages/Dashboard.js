// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import EditInventory from '../components/EditInventory'; // A separate component for editing
// // import { Link } from "react-router-dom";

// // const Dashboard = () => {
// //   const [inventory, setInventory] = useState([]);
// //   const [selectedItem, setSelectedItem] = useState(null);

// //   // Fetch Inventory Data
// //   useEffect(() => {
// //     const fetchInventory = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:5000/api/inventory');
// //         setInventory(res.data);
// //       } catch (err) {
// //         alert('Error fetching inventory');
// //       }
// //     };

// //     fetchInventory();
// //   }, []);

// //   // Handle item selection for editing
// //   const handleEdit = (item) => {
// //     setSelectedItem(item);
// //   };

// //   // Send immediate email reminder
// //   const handleSendEmail = async (id) => {
// //     try {
// //       await axios.post(`http://localhost:5000/api/inventory/send-email/${id}`);
// //       alert('Maintenance reminder email sent successfully!');
// //     } catch (err) {
// //       console.error("Error sending immediate email:", err);
// //       alert('Failed to send email');
// //     }
// //   };

// //   return (
// //     <div className="dashboard">
// //       <h2>Dashboard</h2>
// //       <Link to="/add-inventory">
// //   <button>Add New Inventory</button>
// // </Link>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Item</th>
// //             <th>Type</th>
// //             <th>Last Maintenance</th>
// //             <th>Interval (Months)</th>
// //             <th>Responsible</th>
// //             <th>Email</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {inventory.map((item) => (
// //             <tr key={item._id}>
// //               <td>{item.name}</td>
// //               <td>{item.type}</td>
// //               <td>{new Date(item.lastMaintenance).toLocaleDateString()}</td>
// //               <td>{item.maintenanceInterval}</td>
// //               <td>{item.responsiblePerson}</td>
// //               <td>{item.email}</td>
// //               <td>
// //                 <button onClick={() => handleEdit(item)}>Edit</button>
// //                 {/* Send Now Button */}
// //                 <button
// //                   onClick={() => handleSendEmail(item._id)}
// //                   style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
// //                 >
// //                   Send Now
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {selectedItem && (
// //         <EditInventory item={selectedItem} onUpdate={() => setSelectedItem(null)} />
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EditInventory from "../components/EditInventory"; // Component for editing inventory
// import { Link } from "react-router-dom";
// import "../styles/dashboard.css"

// const Dashboard = () => {
//   const [inventory, setInventory] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditOpen, setIsEditOpen] = useState(false);

//   // Fetch Inventory Data

//     const fetchInventory = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/inventory");
//         setInventory(res.data);
//       } catch (err) {
//         alert("Error fetching inventory");
//       }
//     };

//     useEffect(() => {
//     fetchInventory();
//   }, []);

//   // Handle item selection for editing
//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setIsEditOpen(true);
//   };

//   const handleCloseEdit = async () => {
//     setIsEditOpen(false);
//     setSelectedItem(null);
//     await fetchInventory(); // Refresh inventory list
//   };

//   // Send immediate email reminder
//   const handleSendEmail = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/api/inventory/send-email/${id}`);
//       alert("Maintenance reminder email sent successfully!");
//     } catch (err) {
//       console.error("Error sending immediate email:", err);
//       alert("Failed to send email");
//     }
//   };

//   // Filter inventory based on search term
//   const filteredInventory = inventory.filter((item) =>
//     (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (item.responsiblePerson && item.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (item.Item_id && String(item.Item_id).includes(searchTerm))
//   );

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>Inventory Dashboard</h2>
//         <div className="dashboard-actions">
//           <input
//             type="text"
//             placeholder="Search inventory..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-bar"
//           />
//           <Link to="/add-inventory">
//             <button className="add-button">+ Add Inventory</button>
//           </Link>
//         </div>
//       </div>

//       <table className="inventory-table">
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Item ID</th>
//             <th>Location</th>
//             <th>Last Maintenance</th>
//             <th>Interval (Months)</th>
//             <th>Responsible</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredInventory.length > 0 ? (
//             filteredInventory.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.name}</td>
//                 <td>{item.Item_id}</td>
//                 <td>{item.location}</td>
//                 <td>{new Date(item.lastMaintenance).toLocaleDateString()}</td>
//                 <td>{item.maintenanceInterval}</td>
//                 <td>{item.responsiblePerson}</td>
//                 <td>{item.email}</td>
//                 <td>
//                   <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
//                   <button className="send-button" onClick={() => handleSendEmail(item._id)}>Send Now</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="no-data">No matching records found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Show EditInventory Modal */}
//       {isEditOpen && selectedItem && (
//         <EditInventory
//           item={selectedItem}
//           onUpdate={handleCloseEdit}
//           onClose={handleCloseEdit}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import EditInventory from "../components/EditInventory";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import QRModal from "../components/QRModal";
import Navbar from "../components/Navbar";

const apiUrl = process.env.REACT_APP_REACT_URL;


const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [selectedQR, setSelectedQR] = useState(null);
  const [error, setError] = useState(null);

  // const fetchInventory = async () => {
  //   try {
  //     const token = localStorage.getItem("token"); // ✅ Get token from storage
  //     if (!token) {
  //       throw new Error("No token found. Please log in again.");
  //     }

  //     const res = await axios.get("http://localhost:5000/api/inventory", {
  //       headers: { Authorization: `Bearer ${token}` }, // ✅ Attach token
  //     });

  //     setInventory(res.data);
  //   } catch (err) {
  //     console.error("Error fetching inventory:", err);
  //     setError("Unauthorized access. Please log in again.");
  //   }
  // };

  // useEffect(() => {
  //   fetchInventory();
  // }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const res = await axios.get(`${apiUrl}/api/inventory`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInventory(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setError("Unauthorized access. Please log in again.");
    }
  };

  // Auto-fetch every 5 seconds to reflect changes dynamically
  useEffect(() => {
    fetchInventory();
    const interval = setInterval(fetchInventory, 5000); // Fetch latest inventory every 5 sec
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  const handleGenerateQR = (inventoryItem) => {
    const formattedData = `
      📦 Item: ${inventoryItem.name}
      🆔 ID: ${inventoryItem.Item_id}
      📍 Location: ${inventoryItem.location}
      🔧 Last Maintenance: ${new Date(
        inventoryItem.lastMaintenance
      ).toLocaleDateString()}
      ⏳ Interval: ${inventoryItem.maintenanceInterval} months
      👤 Responsible: ${inventoryItem.responsiblePerson}
      📧 Email: ${inventoryItem.email}
    `;

    setSelectedQR(formattedData.trim()); // Set the formatted QR data
  };

  const handleCloseEdit = async () => {
    setIsEditOpen(false);
    setSelectedItem(null);
    await fetchInventory();
  };

  // const handleSendEmail = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");  // Get the token from localStorage
  //     if (!token) {
  //       throw new Error("No token found. Please log in again.");
  //     }

  //     // Send the token in the request header
  //     await axios.post(`http://localhost:5000/api/inventory/send-email/${id}`, {}, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     alert("Maintenance reminder email sent successfully!");
  //   } catch (err) {
  //     console.error("Error sending immediate email:", err);
  //     alert("Failed to send email");
  //   }
  // };

  const handleSendEmail = async (item) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      // Check if the task is completed
      if (item.status === "Completed") {
        // Calculate the next due date based on the interval
        const lastMaintenance = new Date(item.lastMaintenance);
        const nextDueDate = new Date(
          lastMaintenance.setMonth(
            lastMaintenance.getMonth() + item.maintenanceInterval
          )
        );

        // Create a new task with the updated due date
        await axios.post(
          `${apiUrl}/api/inventory`,
          {
            name: item.name,
            Item_id: item.Item_id,
            location: item.location,
            lastMaintenance: nextDueDate,
            maintenanceInterval: item.maintenanceInterval,
            responsiblePerson: item.responsiblePerson,
            email: item.email,
            status: "Pending", // New task starts as Pending
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Task completed. New task created for the next interval.");
        fetchInventory(); // Refresh the inventory list
      } else {
        // If not completed, send the email as usual
        await axios.post(
          `${apiUrl}/api/inventory/send-email/${item._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Maintenance reminder email sent successfully!");
      }
    } catch (err) {
      console.error("Error sending email or creating next task:", err);
      alert("Failed to send email or create next task");
    }
  };

  const filteredInventory = inventory.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.location &&
        item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.responsiblePerson &&
        item.responsiblePerson
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (item.Item_id && String(item.Item_id).includes(searchTerm)) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pendingTasks = filteredInventory.filter(
    (item) => item.status !== "Completed"
  );
  const completedTasks = filteredInventory.filter(
    (item) => item.status === "Completed"
  );
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        {/* Header Section */}

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

        {/* Grid-Based Layout */}
        <div className="pending-section">
      <h3 className="heading">Pending Tasks</h3>
      <div className="inventory-grid">
        {pendingTasks.length > 0 ? (
          pendingTasks.map((item) => (
            <div key={item._id} className="inventory-card pending-card">
              <h3>{item.name}</h3>
              <p>
                <strong>ID:</strong> {item.Item_id}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Last Maintenance:</strong>{" "}
                {new Date(item.lastMaintenance).toLocaleDateString()}
              </p>
              <p>
                <strong>Interval:</strong> {item.maintenanceInterval} months
              </p>
              <p>
                <strong>Responsible:</strong> {item.responsiblePerson}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  style={{
                    color: item.status === "Completed" ? "green" : "red",
                  }}
                >
                  {item.status || "Pending"}
                </span>
              </p>
              <div className="card-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="send-button"
                  onClick={() => handleSendEmail(item)}
                >
                  Send Now
                </button>
                <button onClick={() => handleGenerateQR(item)}>
                  Generate QR
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No matching records found</p>
        )}
      </div>
    </div>

    <div className="completed-section">
      <h3 className="heading">Completed Tasks</h3>
      <div className="inventory-grid">
        {completedTasks.length > 0 ? (
          completedTasks.map((item) => (
            <div key={item._id} className="inventory-card completed-card">
              <h3>{item.name}</h3>
              <p>
                <strong>ID:</strong> {item.Item_id}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Last Maintenance:</strong>{" "}
                {new Date(item.lastMaintenance).toLocaleDateString()}
              </p>
              <p>
                <strong>Interval:</strong> {item.maintenanceInterval} months
              </p>
              <p>
                <strong>Responsible:</strong> {item.responsiblePerson}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Status:</strong>
                <span style={{ color: "green" }}>Completed</span>
              </p>
            </div>
          ))
        ) : (
          <p className="no-data">No completed tasks yet</p>
        )}
      </div>
    </div>

        {/* Edit Modal */}
        {isEditOpen && selectedItem && (
          <EditInventory
            item={selectedItem}
            onUpdate={handleCloseEdit}
            onClose={handleCloseEdit}
          />
        )}

        <div className="qr-modal-container">
          {" "}
          {/* New container div */}
          {selectedQR && (
            <QRModal qrData={selectedQR} onClose={() => setSelectedQR(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
