import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_REACT_URL;


const ItemDetails = () => {
    const { id } = useParams();  // Get ID from URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace this with your actual API endpoint
        fetch(`${apiUrl}/api/items/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setItem(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching item:", error));
    }, [id]);

    if (loading) {
        return <h2>Loading item details...</h2>;
    }

    if (!item) {
        return <h2>Item not found!</h2>;
    }

    return (
        <div style={{ padding: "20px", color: "#fff", backgroundColor: "#1e1e1e" }}>
            <h1>Item Details</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Responsible Person:</strong> {item.responsible}</p>
            <p><strong>Updated On:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
        </div>
    );
};

export default ItemDetails;
