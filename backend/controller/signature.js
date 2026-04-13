import Signature from "../models/signature.js";
import fs from "fs";

export const createSignature = async (req, res) => {
    try {
        let image_file = `${req.file.filename}`
        const { signatureName, Font, fontsize } = req.body;

        if (!signatureName || !Font || !fontsize || !image_file) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        if (image_file) {
            const newSignature = new Signature({
                user: req.userId,
                signatureName,
                signatureImage: image_file,
                Font,
                fontsize
            });
            await newSignature.save();
        }
        res.status(201).json({
            message: "Signature created successfully",
            success: true,
            data: {
                signature: newSignature
            }
        });

    } catch (error) {
        console.error("Create Signature Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}