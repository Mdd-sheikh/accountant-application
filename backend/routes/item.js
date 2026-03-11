import express from  'express'
import auth from '../middleware/auth.js'
import { createItem } from '../controller/item.js'
import { getItems } from '../controller/item.js'
import { updateItem } from '../controller/item.js'


const itemrouter = express.Router()

itemrouter.post("/create/item",auth,createItem);
itemrouter.get("/get/item",auth,getItems);
itemrouter.put("/update/item/:id",auth,updateItem);
export default itemrouter;