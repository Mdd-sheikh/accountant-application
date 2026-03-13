import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Item.css";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import { NavLink } from "react-router-dom";

const Item = () => {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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

    // OPEN DELETE CONFIRM
    const deleteItem = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    // CONFIRM DELETE
    const confirmDeleteItem = async () => {

        try {

            await axios.delete(`${API_URL}/items/delete/item/${deleteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Item deleted successfully");

            fetchItems();

        } catch (error) {

            toast.error("Delete failed");

        }

        setShowConfirm(false);
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

                    <NavLink to="/503/invoice/create#item">
                        <button className="create-btn">+ Create Item</button>
                    </NavLink>

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

                                        <button
                                            className="update-btn"
                                            onClick={() => updateItem(item._id)}
                                        >
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

            {/* DELETE CONFIRM MODAL */}

            {showConfirm && (

                <div className="confirm-overlay">

                    <div className="confirm-box">

                        <h3>Delete Item</h3>

                        <p>Are you sure you want to delete this item?</p>

                        <div className="confirm-buttons">

                            <button
                                className="yes-btn"
                                onClick={confirmDeleteItem}
                            >
                                Yes Delete
                            </button>

                            <button
                                className="no-btn"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Item;