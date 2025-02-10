import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditInventory from "./components/EditInventory";
import AddInventory from "./components/AddInventory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Edit" element={<EditInventory />} />
        <Route path="/add-inventory" element={<AddInventory />} />
      </Routes>
    </Router>
  );
}

export default App;
