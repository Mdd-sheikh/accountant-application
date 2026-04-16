import companymodel from "../models/company.js";
// validate gst number


export const CtreateCompany = async (req, res) => {
    try {

        // ✅ auth check
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

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
            user: req.user._id   // 🔥 important
        });

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: company
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
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const companydata = await companymodel.find({
            user: req.user._id
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