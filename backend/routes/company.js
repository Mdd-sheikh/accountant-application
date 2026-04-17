import express from 'express'
import { CtreateCompany, GetCompanyData, updateCompanydata } from '../controller/company.js'
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

companyRouter.post("/create",auth, CtreateCompany);
companyRouter.get("/get",auth,GetCompanyData)
companyRouter.put("/update",auth,upload.single("companyProfile"),updateCompanydata)

export default companyRouter;