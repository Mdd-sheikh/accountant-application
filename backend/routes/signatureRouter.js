import express from 'express';
import { createSignature } from '../controller/signature.js';
import auth from '../middleware/auth.js';
import multer from 'multer';


const SignatureRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

SignatureRouter.post("/signature", auth,upload.single("signatureImage"), createSignature);

export default SignatureRouter;