// controllers/itemController.js
import ItemSchema from "../models/item.js";

// Create Item
export const createItem = async (req, res) => {
  try {

    const {
      name,
      unit,
      hsnCode,
      gstRate,
      cessRate,
      price,
      quantity,
      discount,
      category
    } = req.body;

    // get userId from logged in user
    const userId = req.user._id;

    // validation
    if (!name || !type || !unit || gstRate === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, type, unit, gstRate"
      });
    }

    const item = new ItemSchema({
      userId,
      name,
      type,
      unit,
      hsnCode,
      gstRate,
      cessRate,
      price,
      quantity,
      discount,
      category
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item
    });

  } catch (error) {
    console.error("Create Item Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};