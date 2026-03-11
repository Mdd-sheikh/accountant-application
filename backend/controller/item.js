// controllers/itemController.js
import Item from "../models/item.js";

export const createItem = async (req, res) => {
  try {

    const item = await Item.create({
      ...req.body,
      userId: req.user._id   // only logged-in user can create item
    });

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};