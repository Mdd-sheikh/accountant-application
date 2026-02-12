import express from 'express'
import { GetUser, Login, Registration } from '../controller/User.js'

const router = express.Router()

 router.post("/register",Registration);
 router.post("/login",Login)
 router.get("/userdata",GetUser)

 export default router