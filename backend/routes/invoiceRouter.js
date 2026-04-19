import express from 'express'
import auth from '../middleware/auth.js'
import { generateInvoiceNumber, getInvoicePDF } from '../controller/invoice.js';
import { createInvoice } from '../controller/invoice.js';




const Invoicerouter = express.Router()
Invoicerouter.post("/create",auth,createInvoice);
Invoicerouter.get("/get",auth,generateInvoiceNumber)
Invoicerouter.get("/get/invoicepdf/:id",auth,getInvoicePDF)


export default Invoicerouter;