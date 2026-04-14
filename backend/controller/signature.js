import Signature from "../models/signature.js";
import cloudinary from "../config/cloudary.js";



export const createSignature = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { signatureName, font, fontSize } = req.body;

        let imageUrl = "";
        let publicId = "";

        // Cloudinary (multer-storage-cloudinary)
        if (req.file) {
            imageUrl =
                req.file.path ||
                req.file.location ||
                "";

            publicId =
                req.file.filename ||
                req.file.public_id ||
                "";
        }

        const newSignature = new Signature({
            user: req.user._id,
            signatureName: signatureName || "",
            signatureImage: imageUrl,
            cloudinary_id: publicId,
            font: font || "",
            fontSize: fontSize || ""
        });

        await newSignature.save();

        return res.status(201).json({
            success: true,
            message: "Signature created successfully",
            data: newSignature
        });

    } catch (error) {
        console.error("CREATE SIGNATURE ERROR:", error);

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