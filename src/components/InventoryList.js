import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InventoryItem from './InventoryItem'; // Component that displays each inventory item

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory items
    const fetchInventory = async () => {
      try {
        const response = await axios.get('https://landt-maintain-production.up.railway.app/api/inventory');
        setInventory(response.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Inventory List</h2>
      {inventory.length > 0 ? (
        inventory.map((item) => (
          <InventoryItem key={item._id} item={item} />
        ))
      ) : (
        <p>No inventory items found.</p>
      )}
    </div>
  );
};

export default InventoryList;
