import mongoose from 'mongoose'

const companySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_Registration",
        required: true
    },
    compnayName: {
        type: String
    },
    companyGST: {
        type: String,
    },
    companyMobileNo: {
        type: String
    },
    companyEmail: {
        type: String
    },
    companyAddress: {
        type: String
    },
    companyPincode: {
        type: String
    },
    companyCity: {
        type: String
    },
    companyProfile: {
        type: String
    },
    publicId: {
        type: String
    },
}, { timestamps: true })

const companymodel = mongoose.model("company", companySchema)
export default companymodel;