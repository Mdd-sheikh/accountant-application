import express from 'express'
import { GetUser, Login, Registration } from '../controller/User.js'
import auth from '../middleware/auth.js';


const router = express.Router()

 router.post("/register",Registration);
 router.post("/login",Login)
 router.get("/profile",auth,GetUser)

 export default router;