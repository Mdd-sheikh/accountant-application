import express from 'express'
import auth from '../middleware/auth'
import { Invoice } from '../models/invoice'

const router = express.Router()

router.post("/invoice/create",auth,Invoice)