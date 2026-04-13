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

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const GetSignatures = async (req, res) => {
    try {
        const signatures = await Signature.find({ user: req.user._id });

        return res.status(200).json({
            success: true,
            data: signatures
        });
    } catch (error) {
        console.log("REAL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const DeleteSignature = async (req, res) => {
    try {
        const { id } = req.params;
        const signature = await Signature.findOne({ _id: id, user: req.user._id });

        if (!signature) {
            return res.status(404).json({
                success: false,
                message: "Signature not found"
            });
        }
        if (signature.signatureImage) {
            const filePath = `uploads/${signature.signatureImage}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Signature.deleteOne({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Signature deleted successfully"
        });
    } catch (error) {
        console.log("REAL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

