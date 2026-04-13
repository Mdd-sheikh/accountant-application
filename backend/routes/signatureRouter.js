import express from 'express';
import { createSignature, DeleteSignature, GetSignatures } from '../controller/signature.js';
import auth from '../middleware/auth.js';
import multer from 'multer';


const SignatureRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

SignatureRouter.post("/signature", auth, upload.single("signatureImage"), createSignature);
SignatureRouter.get("/signature/get", auth, GetSignatures);
SignatureRouter.delete("/signature/delete/:id", auth, DeleteSignature);

export default SignatureRouter;