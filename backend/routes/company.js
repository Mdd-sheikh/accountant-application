import express from 'express'
import { CtreateCompany } from '../controller/company.js'
import cloudinary from '../config/cloudary.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import auth from '../middleware/auth.js'
const companyRouter = express.Router()



// for image storage 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "companyProfile",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})

const upload = multer({storage})

companyRouter.post("/company",auth, CtreateCompany);

export default companyRouter;