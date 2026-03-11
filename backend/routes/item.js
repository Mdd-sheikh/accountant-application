import express from  'express'
import auth from '../middleware/auth.js'
import { createItem } from '../controller/item.js'

const itemrouter = express.Router()

itemrouter.post("/create/item",auth,createItem);

export default itemrouter;