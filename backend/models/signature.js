import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    signatureName: {
        type: String

    },
    signatureImage: {
        type: String

    },
    font: {
        type: String

    },
    fontSize: {
        type: String
    },
    cloudinary_id: {
        type: String
    }

}, { timestamps: true });

const Signature = mongoose.model("Signature", signatureSchema);

export default Signature;