import express from 'express';
import { createSignature, DeleteSignature, GetSignatures } from '../controller/signature.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import fs from 'fs'



const SignatureRouter = express.Router();

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads", { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

SignatureRouter.post("/signature", auth, upload.single("signatureImage"), createSignature);
SignatureRouter.get("/signature/get", auth, GetSignatures);
SignatureRouter.delete("/signature/delete/:id", auth, DeleteSignature);

export default SignatureRouter;