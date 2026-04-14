import express from 'express';
import { createSignature, DeleteSignature, GetSignatures } from '../controller/signature.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../config/cloudary.js'; 



const SignatureRouter = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "signatures",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
});

const upload = multer({ storage });


SignatureRouter.post("/signature", auth, upload.single("signatureImage"), createSignature);
SignatureRouter.get("/signature/get", auth, GetSignatures);
SignatureRouter.delete("/signature/delete/:id", auth, DeleteSignature);

export default SignatureRouter;