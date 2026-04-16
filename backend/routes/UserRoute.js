import express from 'express'
import { GetUser, Login, Registration } from '../controller/User.js'
import auth from '../middleware/auth.js';



const router = express.Router()

// save profile picture in cloudary and save url in database


router.post("/register", Registration);
router.post("/login", Login)
router.get("/profile", auth, GetUser)


export default router;