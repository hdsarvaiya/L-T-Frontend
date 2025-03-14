// import { useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import "../styles/dashboard.css";

// const UserDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [userEmail, setUserEmail] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         if (decodedToken?.email) {
//           setUserEmail(decodedToken.email);
//         } else {
//           console.error("Decoded token does not have an 'email' property:", decodedToken);
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     } else {
//       console.error("Token not found in localStorage.");
//     }
//   }, []);

//   useEffect(() => {
//     if (!userEmail) return;
  
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get(`http://localhost:5000/api/user-tasks?email=${userEmail}`, {
//           headers: {
//             Authorization: `Bearer ${token}` // Adding the Authorization header with token
//           }
//         })
//         .then((res) => setTasks(res.data))
//         .catch((err) => console.error("Error fetching tasks:", err));
//     }
//   }, [userEmail]);
  

//   const updateMaintenanceStatus = async (taskId, newStatus) => {
//     const token = localStorage.getItem("token");
  
//     if (!token) {
//       console.error("Token not found in localStorage");
//       return;
//     }
  
//     try {
//       await axios.patch("http://localhost:5000/api/update-maintenance", {
//         taskId,
//         status: newStatus,
//         lastMaintenance: new Date().toISOString(),
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`  // Send the token in the Authorization header
//         }
//       });
  
//       console.log("✅ Maintenance Updated");
  
//       // Re-fetch updated task list
//       axios
//         .get(`http://localhost:5000/api/user-tasks?email=${userEmail}`, {
//           headers: {
//             Authorization: `Bearer ${token}`  // Ensure token is sent with the GET request
//           }
//         })
//         .then((res) => setTasks(res.data))
//         .catch((err) => console.error("Error fetching updated tasks:", err));
  
//     } catch (error) {
//       console.error("❌ Error updating maintenance status:", error);
//     }
//   };
  
  
//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>Your Maintenance Tasks</h2>
//       </div>

//       {tasks.length > 0 ? (
//         <div className="inventory-grid">
//           {tasks.map((task) => (
//             <div key={task._id} className="inventory-card">
//               <h3>{task.name}</h3>
//               <p>Due on: {new Date(task.nextMaintenance).toDateString()}</p>
//               <p>Last Maintenance: {new Date(task.lastMaintenance).toDateString()}</p>
//               <p className={`maintenance-status ${getStatusClass(task.status)}`}>
//                 {task.status}
//               </p>
//               <div className="card-actions">
//                 <button
//                   className="edit-button"
//                   onClick={() => updateMaintenanceStatus(task._id, "Completed")}
//                 >
//                   Maintenance Completed
//                 </button>
//                 <button
//                   className="send-button"
//                   onClick={() => updateMaintenanceStatus(task._id, "Not Completed Due to Issue")}
//                 >
//                   Not Completed Due to Issue
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-data">No tasks available.</p>
//       )}
//     </div>
//   );
// };

// const getStatusClass = (status) => {
//   switch (status) {
//     case "Completed":
//       return "status-good";
//     case "Not Completed Due to Issue":
//       return "status-critical";
//     default:
//       return "";
//   }
// };

// export default UserDashboard;


import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/dashboard.css";
const apiUrl = process.env.REACT_APP_REACT_URL;


const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken?.email) {
          setUserEmail(decodedToken.email);
        } else {
          console.error("Decoded token does not have an 'email' property:", decodedToken);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Token not found in localStorage.");
    }
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${apiUrl}/api/user-tasks?email=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [userEmail]);

  const updateMaintenanceStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      await axios.patch(`${apiUrl}/api/update-maintenance`, {
        taskId,
        status: newStatus,
        lastMaintenance: new Date().toISOString(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("✅ Maintenance Updated");

      // Re-fetch updated task list
      axios
        .get(`${apiUrl}/api/user-tasks?email=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Error fetching updated tasks:", err));

    } catch (error) {
      console.error("❌ Error updating maintenance status:", error);
    }
  };

  // Filter tasks into ongoing and completed
  const ongoingTasks = tasks.filter(task => task.status !== "Completed");
  const completedTasks = tasks.filter(task => task.status === "Completed");

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Your Maintenance Tasks</h2>
      </div>

      {ongoingTasks.length > 0 ? (
        <div className="inventory-grid">
          {ongoingTasks.map((task) => (
            <div key={task._id} className="inventory-card">
              <h3>{task.name}</h3>
              <p>Due on: {new Date(task.nextMaintenance).toDateString()}</p>
              <p>Last Maintenance: {new Date(task.lastMaintenance).toDateString()}</p>
              <p className={`maintenance-status ${getStatusClass(task.status)}`}>
                {task.status}
              </p>
              <div className="card-actions">
                <button
                  className="edit-button"
                  onClick={() => updateMaintenanceStatus(task._id, "Completed")}
                >
                  Maintenance Completed
                </button>
                <button
                  className="send-button"
                  onClick={() => updateMaintenanceStatus(task._id, "Not Completed Due to Issue")}
                >
                  Not Completed Due to Issue
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No ongoing tasks available.</p>
      )}

      {/* Completed Tasks Section */}
      <div className="completed-tasks-section">
        <h2>Completed Tasks</h2>
        {completedTasks.length > 0 ? (
          <div className="inventory-grid">
            {completedTasks.map((task) => (
              <div key={task._id} className="inventory-card">
                <h3>{task.name}</h3>
                <p>Completed on: {new Date(task.lastMaintenance).toDateString()}</p>
                <p className={`maintenance-status ${getStatusClass(task.status)}`}>
                  {task.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No completed tasks available.</p>
        )}
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "Completed":
      return "status-good";
    case "Not Completed Due to Issue":
      return "status-critical";
    default:
      return "";
  }
};

export default UserDashboard;
