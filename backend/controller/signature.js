import Signature from "../models/signature.js";
import fs from "fs";


export const createSignature = async (req, res) => {
    try {
        const image_file = req.file?.filename || "";

        const { signatureName, Font, fontsize } = req.body;

        if (!image_file && (!signatureName || !Font || !fontsize)) {
            return res.status(400).json({
                success: false,
                message: "Provide image or text signature"
            });
        }

        const newSignature = new Signature({
            user: req.user._id, // IMPORTANT
            signatureName: signatureName || "",
            signatureImage: image_file,
            font: Font || "",
            fontsize: fontsize || ""
        });

        await newSignature.save();

        return res.status(201).json({
            success: true,
            message: "Signature created successfully",
            data: newSignature
        });

    } catch (error) {
        console.log("REAL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};