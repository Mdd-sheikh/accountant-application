import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer_item.css";
import { useContext } from "react";
import { Context } from "../../../../../context/Context";
import { toast } from "react-toastify";

const Customer_item = () => {
  const [showItemPopup, setShowItemPopup] = useState(false);
  const [customerItems, setCustomerItems] = useState([]); // Initialize as empty array
  const [selectedItems, setSelectedItems] = useState([]);
  const { API_URL } = useContext(Context);

  const [newItem, setNewItem] = useState({
    type: "Goods",
    name: "",
    unit: "BAL",
    hsn: "",
    cess: "",
    category: "",
  });
  console.log(newItem);

  const token = localStorage.getItem("token");

  // ------------------ FETCH CUSTOMER ITEMS ------------------
  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items/get/item", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomerItems(res.data.items || []); // fallback to empty array
    } catch (err) {
      console.error(err);
      setCustomerItems([]); // fallback to empty array
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ------------------ HANDLE NEW ITEM POPUP INPUT ------------------
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------ SAVE NEW ITEM ------------------
  const saveNewItem = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/items/create/item`,
        { ...newItem },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCustomerItems((prev) => [...prev, res.data.item]);
      setShowItemPopup(false);
      toast.success(res?.data?.message || "Item added successfully");
      setNewItem({
        type: "Goods",
        name: "",
        unit: "BAL",
        hsn: "",
        gstRate: "5%",
        cess: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to add item");
    }
  };

  // ------------------ HANDLE SELECT ITEM FROM DROPDOWN ------------------
  const handleSelectItem = (e) => {
    const itemId = e.target.value;
    if (itemId === "add_item") {
      setShowItemPopup(true);
      return;
    }
    const item = customerItems.find((i) => i._id === itemId);
    if (item && !selectedItems.find((i) => i._id === item._id)) {
      setSelectedItems((prev) => [
        ...prev,
        { ...item, quantity: 1, price: 0, discount: 0, gstRate: 0, total: 0 },
      ]);
    }
  };

  // ------------------ HANDLE TABLE INPUT CHANGES ------------------
  const handleItemChange = (index, field, value) => {
    const items = [...selectedItems];
    items[index][field] = value;

    // Calculate total
    const qty = parseFloat(items[index].quantity) || 0;
    const price = parseFloat(items[index].price) || 0;
    const discount = parseFloat(items[index].discount) || 0;
    const gstRate = parseFloat(items[index].gstRate) || 0;

    const taxable = qty * price - discount;
    const gstAmt = (taxable * gstRate) / 100;
    const total = taxable + gstAmt;

    items[index].total = total.toFixed(2);
    setSelectedItems(items);
  };

  // ------------------ REMOVE ITEM ------------------
  const handleRemoveItem = (index) => {
    const items = [...selectedItems];
    items.splice(index, 1);
    setSelectedItems(items);
  };

  return (
    <div className="customer_item">
      <div className="table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Items</th>
              <th>Qty.</th>
              <th>Rate</th>
              <th>Discount</th>
              <th>Taxable Amt.</th>
              <th>GST</th>
              <th className="total-highlight">Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems?.map((item, index) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                  />
                  <br />
                  <span className="sub-text">(Exc. tax)</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.discount}
                    onChange={(e) =>
                      handleItemChange(index, "discount", e.target.value)
                    }
                  />
                </td>
                <td>{(item.quantity * item.price - item.discount).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.gstRate}
                    onChange={(e) =>
                      handleItemChange(index, "gstRate", e.target.value)
                    }
                  />
                </td>
                <td>{item.total}</td>
                <td className="action-icons">
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => handleRemoveItem(index)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Item Select Dropdown */}
      <div className="invoice-select-item">
        <div className="select-item">
          <p>Select Item <sup>*</sup></p>
          <select onChange={handleSelectItem} defaultValue="">
            <option value="">Select Item</option>
            {customerItems?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
            <option value="add_item">+ Add Item</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="item-quantity">
          <p>Quantity <sup>*</sup></p>
          <input type="number" placeholder="Enter Quantity" />
          <button>UQC</button>
        </div>

        {/* Price */}
        <div className="item-price">
          <p>Price <sup>*</sup></p>
          <input type="number" placeholder="Enter Price" />
          <select>
            <option>Inc. Tax</option>
            <option>Exc. Tax</option>
          </select>
        </div>

        {/* Discount */}
        <div className="item-discount">
          <p>Discount <sup>*</sup></p>
          <input type="number" placeholder="Enter Discount" />
          <select>
            <option>0%</option>
            <option>1%</option>
            <option>1.2%</option>
          </select>
        </div>

        {/* GST Rate */}
        <div className="item-gst-rate">
          <p>GST Rate <sup>*</sup></p>
          <select>
            <option>0.1</option>
            <option>0.2</option>
            <option>0.4</option>
            <option>0.5</option>
          </select>
          <button>+ Add</button>
        </div>
      </div>

      {/* Table */}


      {/* Item Popup */}
      {showItemPopup && (
        <div className="popup-overlay">
          <div className="item-popup">
            <div className="popup-header">
              <h2>Create Item</h2>
              <button
                className="close-btn"
                onClick={() => setShowItemPopup(false)}
              >
                ×
              </button>
            </div>
            <div className="popup-body">
              <div className="item-type">
                <label>Type</label>
                <div>
                  <input
                    type="radio"
                    name="type"
                    value="Goods"
                    checked={newItem.type === "Goods"}
                    onChange={handleNewItemChange}
                  />{" "}
                  Goods
                  <input
                    type="radio"
                    name="type"
                    value="Service"
                    checked={newItem.type === "Service"}
                    onChange={handleNewItemChange}
                  />{" "}
                  Service
                </div>
              </div>

              <div className="item-row">
                <div>
                  <label>Item Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    placeholder="Enter Item Name"
                    onChange={handleNewItemChange}
                  />
                </div>
                <div>
                  <label>Unit *</label>
                  <select
                    name="unit"
                    value={newItem.unit}
                    onChange={handleNewItemChange}
                  >
                    <option>BAL</option>
                    <option>PCS</option>
                  </select>
                </div>
                <div>
                  <label>HSN Code</label>
                  <input
                    type="text"
                    name="hsn"
                    value={newItem.hsn}
                    placeholder="Enter HSN Code"
                    onChange={handleNewItemChange}
                  />
                </div>
              </div>
              <label>Cess Rate</label>
              <select
                name="cess"
                value={newItem.cess}
                onChange={handleNewItemChange}
              >
                <option>Select Cess Rate</option>
              </select>
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={newItem.category}
                placeholder="Select Category"
                onChange={handleNewItemChange}
              />
            </div>
            <div className="popup-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowItemPopup(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={saveNewItem}>
                Save
              </button>
            </div>
          </div>


        </div>

      )}
    </div >
  );
};

export default Customer_item;