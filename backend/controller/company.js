import companymodel from "../models/company.js";
// validate gst number
const validateGSTFormat = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
};

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