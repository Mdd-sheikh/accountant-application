import jwt from "jsonwebtoken";
import { UserRegister } from "../models/User.js";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token missing",
                success: false
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserRegister.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        req.user = user; // full user object
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default auth;