// controllers/itemController.js
import ItemSchema from "../models/item.js";

// Create a new item
export const createItem = async (req, res) => {
  try {
    const {
      userId,
      name,
      type,
      unit,
      hsnCode,
      gstRate,
      cessRate = 0,
      taxInclusive = false,
      price = 0,
      quantity = 0,
      category
    } = req.body;

    // Basic validation
    if (!userId || !name || !type || !unit || gstRate === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, name, type, unit, gstRate"
      });
    }

    const item = await ItemSchema.create({
      userId,
      name,
      type,
      unit,
      hsnCode,
      gstRate,
      cessRate,
      taxInclusive,
      price,
      quantity,
      category
    });

    item.save();

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item
    });

  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};