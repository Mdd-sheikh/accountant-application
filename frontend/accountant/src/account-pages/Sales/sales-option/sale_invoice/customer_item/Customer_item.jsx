import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Customer_item.css";
import { Context } from "../../../../../context/Context";
import { toast } from "react-toastify";

const Customer_item = () => {
  const [showItemPopup, setShowItemPopup] = useState(false);
  const [customerItems, setCustomerItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); // Track item being updated

  const { API_URL } = useContext(Context);
  const token = localStorage.getItem("token");

  const [newItem, setNewItem] = useState({
    type: "Goods",
    name: "",
    unit: "BAL",
    hsnCode: "",
    cessRate: "",
    category: "",
    quantity: "",
    price: "",
    gstRate: "",
    discount: "",
  });

  // ---------------- HANDLE INPUT ----------------
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- FETCH ITEMS ----------------
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/items/get/item`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomerItems(res.data.items || []);
    } catch (err) {
      console.error(err);
      setCustomerItems([]);
    }
  };

  useEffect(() => {
    fetchItems();

    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        PostItem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ---------------- CREATE ITEM FROM POPUP ----------------
  const savePopupItem = async () => {
    if (!newItem.name) {
      toast.error("Item name is required");
      return;
    }
    try {
      const res = await axios.post(
        `${API_URL}/items/create/item`,
        {
          type: newItem.type,
          name: newItem.name,
          unit: newItem.unit,
          hsnCode: newItem.hsnCode,
          category: newItem.category,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Item created");
      setShowItemPopup(false);
      fetchItems(); // refresh dropdown

      setNewItem({
        type: "Goods",
        name: "",
        unit: "BAL",
        hsnCode: "",
        cessRate: "",
        category: "",
        quantity: "",
        price: "",
        gstRate: "",
        discount: "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to create item");
    }
  };

  // ---------------- SELECT ITEM ----------------
  const handleSelectItem = (e) => {
    const itemId = e.target.value;

    if (itemId === "add_item") {
      setShowItemPopup(true);
      return;
    }

    const item = customerItems.find((i) => i._id === itemId);
    if (!item) return;

    setEditingItemId(item._id);

    setNewItem({
      name: item.name,
      unit: item.unit,
      hsnCode: item.hsnCode,
      category: item.category,
      price: item.price || "",
      discount: item.discount || "",
      gstRate: item.gstRate || "",
      quantity: item.quantity || "",
      type: item.type,
    });

    // Auto-add row if item already has full data
    if (item.price && item.discount != null && item.gstRate) {
      const exists = selectedItems.some(
        (i) =>
          i.name === item.name &&
          i.price === parseFloat(item.price) &&
          i.discount === parseFloat(item.discount) &&
          i.gstRate === parseFloat(item.gstRate)
      );
      if (!exists) {
        const qty = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.price);
        const discount = parseFloat(item.discount);
        const gstRate = parseFloat(item.gstRate);
        const taxable = qty * price - discount;
        const gstAmt = (taxable * gstRate) / 100;
        const total = taxable + gstAmt;

        const itemData = {
          name: item.name,
          quantity: qty,
          price,
          discount,
          gstRate,
          taxable: taxable.toFixed(2),
          total: total.toFixed(2),
        };
        setSelectedItems((prev) => [...prev, itemData]);
      }
    }
  };

  // ---------------- UPDATE ITEM ----------------
  const updateItem = async () => {
    if (!editingItemId) return;
    try {
      const res = await axios.put(
        `${API_URL}/items/update/item/${editingItemId}`,
        {
          price: parseFloat(newItem.price) || 0,
          discount: parseFloat(newItem.discount) || 0,
          gstRate: parseFloat(newItem.gstRate) || 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Item updated");
      fetchItems();
      setEditingItemId(null);
      setNewItem((prev) => ({
        ...prev,
        quantity: "",
        price: "",
        discount: "",
        gstRate: "",
      }));
    } catch (err) {
      console.log(err);
      toast.error("Failed to update item");
    }
  };

  // ---------------- ADD ITEM TO TABLE ----------------
  const PostItem = () => {
    if (!newItem.name) {
      toast.error("Select item first");
      return;
    }

    const qty = parseFloat(newItem.quantity) || 0;
    const price = parseFloat(newItem.price) || 0;
    const discount = parseFloat(newItem.discount) || 0;
    const gstRate = parseFloat(newItem.gstRate) || 0;

    const taxable = qty * price - discount;
    const gstAmt = (taxable * gstRate) / 100;
    const total = taxable + gstAmt;

    const itemData = {
      name: newItem.name,
      quantity: qty,
      price,
      discount,
      gstRate,
      taxable: taxable.toFixed(2),
      total: total.toFixed(2),
    };

    setSelectedItems((prev) => [...prev, itemData]);
    setNewItem((prev) => ({
      ...prev,
      quantity: "",
      price: "",
      discount: "",
      gstRate: "",
    }));
  };

  // ---------------- UPDATE ITEM IN TABLE ----------------
  const handleItemChange = (index, field, value) => {
    const items = [...selectedItems];
    items[index][field] = value;

    const qty = parseFloat(items[index].quantity) || 0;
    const price = parseFloat(items[index].price) || 0;
    const discount = parseFloat(items[index].discount) || 0;
    const gstRate = parseFloat(items[index].gstRate) || 0;

    const taxable = qty * price - discount;
    const gstAmt = (taxable * gstRate) / 100;
    const total = taxable + gstAmt;

    items[index].taxable = taxable.toFixed(2);
    items[index].total = total.toFixed(2);

    setSelectedItems(items);
  };

  // ---------------- REMOVE ITEM ----------------
  const handleRemoveItem = (index) => {
    const items = [...selectedItems];
    items.splice(index, 1);
    setSelectedItems(items);
  };

  // ---------------- TOTAL ----------------
  const invoiceTotal = selectedItems.reduce(
    (acc, item) => acc + (parseFloat(item.total) || 0),
    0
  );

  return (
    <div className="customer_item">
      {/* TABLE */}
      {selectedItems.length > 0 && (
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
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <input
                      id="item"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
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
                  <td>{item.taxable}</td>
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
                  <td>
                    <button onClick={() => handleRemoveItem(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TOTAL */}
      <div className="invoice-total">
        <h3>Total Invoice Amount : ₹ {invoiceTotal.toFixed(2)}</h3>
      </div>

      {/* SELECT ITEM */}
      <div className="invoice-select-item">
        <div className="select-item">
          <p>Select Item *</p>
          <select onChange={handleSelectItem} defaultValue="">
            <option value="">Select Item</option>
            {customerItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
            <option value="add_item">+ Add Item</option>
          </select>
        </div>

        <div className="item-quantity">
          <p>Quantity *</p>
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleNewItemChange}
            placeholder="Enter Quantity"
          />
          <button>UQC</button>
        </div>

        <div className="item-price">
          <p>Price *</p>
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleNewItemChange}
            placeholder="Enter Price"
          />
          <select>
            <option>Inc. Tax</option>
            <option>Exc. Tax</option>
          </select>
        </div>

        <div className="item-discount">
          <p>Discount *</p>
          <input
            type="number"
            name="discount"
            value={newItem.discount}
            onChange={handleNewItemChange}
            placeholder="Enter Discount"
          />
          <select>
            <option>%</option>
            
          </select>
        </div>

        <div className="item-gst-rate">
          <p>GST Rate *</p>
          <select
            name="gstRate"
            value={newItem.gstRate}
            onChange={handleNewItemChange}
          >
            <option value="">Select</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
          {editingItemId ? (
            <button onClick={updateItem}>Update Item</button>
          ) : (
            <button onClick={PostItem}>+ Add</button>
          )}
        </div>
      </div>

      {/* POPUP */}
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
                <input
                  type="radio"
                  name="type"
                  value="Goods"
                  checked={newItem.type === "Goods"}
                  onChange={handleNewItemChange}
                />
                Goods
                <input
                  type="radio"
                  name="type"
                  value="Service"
                  checked={newItem.type === "Service"}
                  onChange={handleNewItemChange}
                />
                Service
              </div>
              <label>Item Name *</label>
              <input name="name" value={newItem.name} onChange={handleNewItemChange} />
              <label>Unit *</label>
              <select name="unit" value={newItem.unit} onChange={handleNewItemChange}>
                <option>BAL</option>
                <option>PCS</option>
              </select>
              <label>HSN</label>
              <input name="hsnCode" value={newItem.hsnCode} onChange={handleNewItemChange} />
              <label>Category</label>
              <input name="category" value={newItem.category} onChange={handleNewItemChange} />
            </div>
            <div className="popup-footer">
              <button className="cancel-btn" onClick={() => setShowItemPopup(false)}>
                Cancel
              </button>
              <button onClick={savePopupItem} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer_item;