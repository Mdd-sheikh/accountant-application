import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Item.css";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";

const Item = () => {
    const [items, setItems] = useState([]);
    console.log(items);

    const [search, setSearch] = useState("");
    const { API_URL } = useContext(Context);

    const token = localStorage.getItem("token");

    // Fetch items
    const fetchItems = async () => {
        try {
            const res = await axios.get(`${API_URL}/items/get/item`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(res.data.items || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch items");
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Delete item
    const deleteItem = async (id) => {
        try {
            await axios.delete(`${API_URL}/items/delete/item/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Item deleted successfully");
            fetchItems();
        } catch (error) {
            toast.error(response.data.message || "Delete failed");
        }
    };

    const updateItem = async (id) => {
        try {
            await axios.put(
                `${API_URL}/items/update/item/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Item updated successfully");
            fetchItems();
        } catch (error) {
            toast.error("Update failed");
        }
    };

    // Filtered items for search (safe check)
    const filteredItems = items.filter((item) => {
        const name = item.name ? item.name.toLowerCase() : "";
        const category = item.category ? item.category.toLowerCase() : "";
        const query = search.toLowerCase();
        return name.includes(query) || category.includes(query);
    });

    return (
        <div className="item-page">
            <div className="item-header">
                <h2>Items List</h2>
                <div className="item-actions">
                    <input
                        type="text"
                        placeholder="Search by item name, category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="create-btn">+ Create Item</button>
                </div>
            </div>

            <div className="item-table-wrapper">
                <table className="item-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Item Type</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>HSN Code</th>
                            <th>Category</th>
                            <th>MRP</th>
                            <th>GST Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name || "-"}</td>
                                    <td>{item.category || "-"}</td>
                                    <td>{item.quantity || "-"}</td>
                                    <td>{item.unit || "-"}</td>
                                    <td>{item.hsnCode || "-"}</td>
                                    <td>{item.category || "-"}</td>
                                    <td>₹{item.price || "0"}</td>
                                    <td>{item.gstRate || "0"}%</td>
                                    <td className="action-btns">
                                        <button className="update-btn" onClick={() => updateItem(item._id)}>
                                            Update
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteItem(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="no-data">
                                    No items found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Item;