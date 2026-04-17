import companymodel from "../models/company.js";
import cloudinary from "../config/cloudary.js";

// validate gst number


export const CtreateCompany = async (req, res) => {
    try {

        // ✅ auth check


        const {
            compnayName,
            companyGST,
            companyMobileNo,
            companyEmail,
            companyAddress,
            companyPincode,
            companyCity
        } = req.body;

        // ✅ duplicate GST check
        const existing = await companymodel.findOne({ companyGST });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Company with this GST already exists"
            });
        }

        // ✅ clean create (like your customer function)
        const company = await companymodel.create({
            compnayName,
            companyGST,
            companyMobileNo,
            companyEmail,
            companyAddress,
            companyPincode,
            companyCity,
            userId: req.userId   // 🔥 important 
        });

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const GetCompanyData = async (req, res) => {
    try {

        // ✅ extra safety (optional but good)

        const companydata = await companymodel.find({
            userId: req.user._id
        });

        return res.status(200).json({
            success: true,
            companydata
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




export const updateCompanydata = async (req, res) => {
    try {
        const userId = req.user._id;

        // ✅ Find existing company
        const existingCompany = await companymodel.findOne({ userId });

        if (!existingCompany) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        let imageUrl = existingCompany.companyProfile;
        let cloudinaryId = existingCompany.cloudinary_id;

        // ✅ If new image uploaded
        if (req.file) {
            // 🔥 Delete old image (important)
            if (existingCompany.cloudinary_id) {
                await cloudinary.uploader.destroy(existingCompany.cloudinary_id);
            }

            // ✅ Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "companyProfile",
            });

            imageUrl = result.secure_url;
            cloudinaryId = result.public_id;
        }

        // ✅ Update data
        const updatedCompany = await companymodel.findOneAndUpdate(
            { userId },
            {
                ...req.body,
                companyProfile: imageUrl,
                cloudinary_id: cloudinaryId,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};