import jwt from "jsonwebtoken";
import { UserRegister } from "../models/User.js";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1️⃣ Check token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing"
            });
        }

        // 2️⃣ Extract token
        const token = authHeader.split(" ")[1];

        // 3️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // decoded = { userId, iat, exp }

        // 4️⃣ Find user
        const user = await UserRegister.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // 5️⃣ Attach user to request
        req.user = user; // full user document
        req.userId = user._id; // OPTIONAL (easy access)

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default auth;