import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer_item.css";
import { useContext } from "react";
import { Context } from "../../../../../context/Context";
import { toast } from "react-toastify";

const Customer_item = () => {
  const [showItemPopup, setShowItemPopup] = useState(false);
  const [customerItems, setCustomerItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { API_URL } = useContext(Context);

  const [newItem, setNewItem] = useState({
    type: "Goods",
    name: "",
    unit: "BAL",
    hsn: "",
    cess: "",
    category: "",
    quantity: "",
    price: "",
    gstRate: "",
    discount: "",
  });
 console.log(newItem);
 
  const token = localStorage.getItem("token");

  // ---------------- HANDLE NEW ITEM INPUT ----------------
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- FETCH ITEMS ----------------
  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/item/get/item", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomerItems(res.data.data || []);
    } catch (err) {
      console.error(err);
      setCustomerItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ----------------post item into database
  const PostItem = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/item/create/item`,
        { ...newItem },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCustomerItems((prev) => [...prev, res.data.item]);
      setShowItemPopup(false);

      toast.success(res?.data?.message || "Item added successfully");

      setNewItem({
        type: "Goods",
        name: "",
        unit: "BAL",
        hsn: "",
        cess: "",
        category: "",
        quantity: "",
        price: "",
        gstRate: "",
        discount: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to add item");
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

    if (item && !selectedItems.find((i) => i._id === item._id)) {
      const qty = 1;
      const price = item.price || 0;
      const discount = 0;
      const gstRate = item.gstRate || 0;

      const taxable = qty * price - discount;
      const gstAmt = (taxable * gstRate) / 100;
      const total = taxable + gstAmt;

      setSelectedItems((prev) => [
        ...prev,
        {
          ...item,
          quantity: qty,
          price,
          discount,
          gstRate,
          taxable: taxable.toFixed(2),
          total: total.toFixed(2),
        },
      ]);
    }
  };


  // ---------------- ITEM CHANGE ----------------
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

  // ---------------- INVOICE TOTAL ----------------
  const invoiceTotal = selectedItems.reduce((acc, item) => {
    return acc + (parseFloat(item.total) || 0);
  }, 0);

  return (
    <div className="customer_item">
      {/* SELECTED ITEMS TABLE */}
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
                    <button onClick={() => handleRemoveItem(index)}>Remove</button>
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

      {/* ITEM SELECT AREA (UNCHANGED) */}
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

        {/* Quantity */}
        <div className="item-quantity">
          <p>Quantity *</p>
          <input type="number" name="quantity" value={newItem.quantity} onChange={handleNewItemChange} placeholder="Enter Quantity" />
          <button>UQC</button>
        </div>

        {/* Price */}
        <div className="item-price">
          <p>Price *</p>
          <input type="number" name="price" value={newItem.price} onChange={handleNewItemChange} placeholder="Enter Price" />
          <select>
            <option>Inc. Tax</option>
            <option>Exc. Tax</option>
          </select>
        </div>

        {/* Discount */}
        <div className="item-discount">
          <p>Discount *</p>
          <input type="number" name="discount" value={newItem.discount} onChange={handleNewItemChange} placeholder="Enter Discount" />
          <select>
            <option>0%</option>
            <option>1%</option>
            <option>1.2%</option>
          </select>
        </div>

        {/* GST */}
        <div className="item-gst-rate">
          <p>GST Rate *</p>
          <select name="gstRate" value={newItem.gstRate} onChange={handleNewItemChange}>
            <option>0.1</option>
            <option>0.2</option>
            <option>0.4</option>
            <option>0.5</option>
          </select>
          <button>+ Add</button>
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

              <label>Item Name *</label>
              <input
                name="name"
                value={newItem.name}
                onChange={handleNewItemChange}
              />

              <label>Unit *</label>
              <select
                name="unit"
                value={newItem.unit}
                onChange={handleNewItemChange}
              >
                <option>BAL</option>
                <option>PCS</option>
              </select>

              <label>HSN</label>
              <input
                name="hsn"
                value={newItem.hsn}
                onChange={handleNewItemChange}
              />

              <label>Category</label>
              <input
                name="category"
                value={newItem.category}
                onChange={handleNewItemChange}
              />
            </div>

            <div className="popup-footer">
              <button onClick={() => setShowItemPopup(false)}>Cancel</button>
              <button onClick={PostItem}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer_item;