import express from 'express'
import auth from '../middleware/auth'
import { getNextInvoiceNumber } from '../controller/invoice.js'

const Invoicerouter = express.Router()

Invoicerouter.post("/invoice/create",auth,Invoice)
Invoicerouter.get("invoice/get",auth,getNextInvoiceNumber)