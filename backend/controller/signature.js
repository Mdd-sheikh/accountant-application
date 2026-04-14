import Signature from "../models/signature.js";
import cloudinary from "../config/cloudary.js";



export const createSignature = async (req, res) => {
    try {
        const image_file = req.file?.path || "";
        const public_id = req.file?.filename || "";

        const { signatureName, font, fontsize } = req.body;

        const newSignature = new Signature({
            user: req.user._id,
            signatureName: signatureName || "",
            signatureImage: image_file,
            cloudinary_id: public_id,
            font: font || "",
            fontsize: fontsize || ""
        });

        await newSignature.save();

        res.status(201).json({
            success: true,
            message: "Signature created successfully",
            data: newSignature
        });

    } catch (error) {
        res.status(500).json({
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

        const signature = await Signature.findById(id);

        if (!signature) {
            return res.status(404).json({
                success: false,
                message: "Signature not found"
            });
        }

        // delete image from Cloudinary
        if (signature.cloudinary_id) {
            await cloudinary.uploader.destroy(signature.cloudinary_id);
        }

        // delete from DB
        await Signature.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Signature deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};