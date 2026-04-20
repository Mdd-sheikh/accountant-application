import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Item.css";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import { NavLink } from "react-router-dom";

const Item = () => {

    const {items, setItems,loadAllData} = useContext(Context);
    const [search, setSearch] = useState("");
    const [animation, setAnimation] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { API_URL } = useContext(Context);

    const token = localStorage.getItem("token");


    const [showAddPopup, setShowAddPopup] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        hsnCode: "",
        gstRate: "",
        quantity: "",
        unit: "",
        category: "",
        price: "",
        discount: ""
    });

    // handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // post item data const addItem = async () => {
    const addItem = async () => {
        try {
            await axios.post(
                `${API_URL}/items/create/item`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Item added successfully");

            setShowAddPopup(false);

            setFormData({
                name: "",
                hsnCode: "",
                gstRate: "",
                quantity: "",
                unit: "",
                category: "",
                price: "",
                discount: ""
            });

            loadAllData();

        } catch (err) {
            toast.error("Failed to add item");
        }
    };
    // Fetch items
    

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

                    <button className="create-btn" onClick={() => setShowAddPopup(true)}>
                        + Create Item
                    </button>

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

                            ))) : animation ? (
                                <tr>
                                    <td colSpan="9">
                                        <div className="loding-animation">
                                            <div className="load"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : null}

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
            {showAddPopup && (
                <div className="confirm-overlay">
                    <div className="confirm-box add-popup">

                        <h3>Add Item</h3>

                        <div className="form-grid">

                            <input name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} />

                            <input name="hsnCode" placeholder="HSN Code" value={formData.hsnCode} onChange={handleChange} />

                            <input name="gstRate" placeholder="GST Rate (%)" value={formData.gstRate} onChange={handleChange} />

                            <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />

                            <input name="unit" placeholder="Unit (kg, pcs...)" value={formData.unit} onChange={handleChange} />

                            <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />

                            <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />

                            <input name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} />

                        </div>

                        <div className="confirm-buttons">

                            <button className="yes-btn" onClick={addItem}>
                                Add Item
                            </button>

                            <button
                                className="no-btn"
                                onClick={() => setShowAddPopup(false)}
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