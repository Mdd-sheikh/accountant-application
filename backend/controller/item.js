// controllers/itemController.js
import { Item } from "../models/item.js";


export const createItem = async (req, res) => {
  try {

    const item = await Item.create({
      ...req.body,
      userId: req.user._id   // only logged-in user can create item
    });
    console.log(req.body);
    

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


export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user._id }); // only logged-in user's items

    res.status(200).json({
      success: true,
      items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


export const updateItem = async (req, res) => {  
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // only logged-in user's item
      req.body,
      { new: true }

    );
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

