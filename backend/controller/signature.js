import Signature from "../models/signature.js";

export const createSignature = async (req, res) => {
    try {
        const { signatureName, font, fontSize } = req.body;

        // safe user access (prevents crash)
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }

        // debug (optional, remove in production)
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        let signatureData = {
            user: userId,
            signatureName: signatureName || null,
            Font: font || null,
            fontsize: fontSize || null,
            signatureImage: null
        };

        // if file uploaded
        if (req.file) {
            signatureData.signatureImage = req.file.path;
        } else {
            // if no image, validate required fields
            if (!signatureName || !Font || !fontsize) {
                return res.status(400).json({
                    success: false,
                    message: "signatureName, Font and fontsize are required when no image is uploaded"
                });
            }
        }

        const newSignature = new Signature(signatureData);
        const savedSignature = await newSignature.save();

        return res.status(201).json({
            success: true,
            message: "Signature created successfully",
            data: savedSignature
        });

    } catch (error) {
        console.error("Create Signature Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};