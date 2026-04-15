import express from 'express'
import { GetUser, Login, Registration } from '../controller/User.js'
import auth from '../middleware/auth.js';
import cloudinary from '../config/cloudary.js';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { UpdateUser } from '../controller/User.js';
import multer from 'multer';


const router = express.Router()

// save profile picture in cloudary and save url in database
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profilePictures",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})
const upload = multer({ storage });

router.post("/register", Registration);
router.post("/login", Login)
router.get("/profile", auth, GetUser)
router.put("/update/user", auth, upload.single("profilePicture"), UpdateUser); 

export default router;