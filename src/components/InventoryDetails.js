import React from "react";
import { useParams } from "react-router-dom";

const InventoryDetails = ({ inventory }) => {
  const { id } = useParams();
  const item = inventory.find((inv) => inv._id === id);

  if (!item) {
    return <h2>Item not found</h2>;
  }

  return (
    <div className="inventory-details">
      <h2>Item Details</h2>
      <p><strong>Name:</strong> {item.name}</p>
      <p><strong>Item ID:</strong> {item.Item_id}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Last Maintenance:</strong> {new Date(item.lastMaintenance).toLocaleDateString()}</p>
      <p><strong>Interval (Months):</strong> {item.maintenanceInterval}</p>
      <p><strong>Responsible:</strong> {item.responsiblePerson}</p>
      <p><strong>Email:</strong> {item.email}</p>
    </div>
  );
};

export default InventoryDetails;
