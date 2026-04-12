import multer from "multer";
import Signature from "../models/signature.js";

// storage config
const signatureImages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// ✅ added security improvements
 const upload = multer({
    storage: signatureImages,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    }
}).single("signatureImage");

export const createSignature = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            const { signatureName, Font, fontsize } = req.body;
            const userId = req.user._id;

            let newSignature;

            // CASE 1: Image uploaded
            if (req.file) {
                newSignature = new Signature({
                    user: userId,
                    signatureImage: req.file.path,
                    signatureName: signatureName || null,
                    Font: Font || null,
                    fontsize: fontsize || null
                });
            }

            // CASE 2: Text signature
            else {
                if (!signatureName || !Font || !fontsize) {
                    return res.status(400).json({
                        success: false,
                        message: "signatureName, Font and fontsize are required if no image is uploaded"
                    });
                }

                newSignature = new Signature({
                    user: userId,
                    signatureName,
                    Font,
                    fontsize,
                    signatureImage: null
                });
            }

            const saved = await newSignature.save();

            return res.status(201).json({
                success: true,
                message: "Signature created successfully",
                data: saved
            });
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};