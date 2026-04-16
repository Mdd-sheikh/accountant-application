import companymodel from "../models/company.js";
// validate gst number


export const CtreateCompany = async (req, res) => {
    try {

        const { compnayName, companyGST, companyMobileNo, companyEmail, companyAddress, companyPincode, companyCity } = req.body;

        const existing = await companymodel.findOne({ companyGST });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Company with this GST already exists"
            });
        }

        const createcompny = new companymodel({
            compnayName,
            companyGST,
            companyMobileNo,
            companyEmail,
            companyAddress,
            companyPincode,
            companyCity,
        })

        await createcompny.save()

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
        });
    } catch (error) {
        res.status(401).json({
            message: error.message,
            success: false
        })
    }
}


export const GetCompanyData = async (req, res) => {
    try {
        const companydata = await companymodel.find({ user: req.user._id });

        return res.status(200).json({
            success: true,
            companydata
        });

    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            success: false
        });
    }
};