// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import EditInventory from "./components/EditInventory";
// import AddInventory from "./components/AddInventory";
// import Navbar from "./components/Navbar";
// import ItemDetails from './pages/ItemDetails'

// // Protected Route Component
// const ProtectedRoute = ({ element }) => {
//   const isAuthenticated = localStorage.getItem("token"); // Check if token exists
//   return isAuthenticated ? element : <Navigate to="/" replace />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
        
//         {/* Protected Routes */}
//         <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
//         <Route path="/Edit" element={<ProtectedRoute element={<EditInventory />} />} />
//         <Route path="/add-inventory" element={<ProtectedRoute element={<AddInventory />} />} />
//         <Route path="/item/:id" element={<ItemDetails />} /> {/* Route for Item Details */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditInventory from "./components/EditInventory";
import AddInventory from "./components/AddInventory";
import ItemDetails from "./pages/ItemDetails";
import UserDashboard from "frontend\\src\\pages\\UserDashboard.js";


// Function to check authentication & role
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
  return decoded.role; // role will be "admin" or "user"
};

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getUserRole();
  return allowedRoles.includes(role) ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes Based on Role */}
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["admin"]} />} />
        <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />} />

        <Route path="/edit-inventory" element={<ProtectedRoute element={<EditInventory />} allowedRoles={["admin"]} />} />
        <Route path="/add-inventory" element={<ProtectedRoute element={<AddInventory />} allowedRoles={["admin"]} />} />
        <Route path="/item/:id" element={<ProtectedRoute element={<ItemDetails />} allowedRoles={["admin", "user"]} />} />
      </Routes>
    </Router>
  );
}

export default App;
