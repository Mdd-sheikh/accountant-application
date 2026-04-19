import express from 'express'
import auth from '../middleware/auth.js'
import { generateInvoiceNumber } from '../controller/invoice.js';
import { createInvoice } from '../controller/invoice.js';




const Invoicerouter = express.Router()
Invoicerouter.post("/create",auth,createInvoice);
Invoicerouter.get("/get",auth,generateInvoiceNumber)


export default Invoicerouter;