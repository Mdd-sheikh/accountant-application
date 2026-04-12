import express from 'express';
import { createSignature } from '../controller/signature.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/signatureUpload.js';


const SignatureRouter = express.Router();

SignatureRouter.post("/signature", auth, upload.single("signatureImage"), createSignature);

export default SignatureRouter;