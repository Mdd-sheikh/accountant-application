import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { UserRegister } from "../models/User.js";
import jwt from "jsonwebtoken";
import validator from 'validator'




export const Registration = async (req, res) => {
    try {
        const { name, email, password, companyName, gstNumber } = req.body;

        // Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email address",
                success: false
            });
        }

        // Password strength
        if (password.length < 10) {
            return res.status(400).json({
                message: "Password must be at least 10 characters",
                success: false
            });
        }

        // Existing user
        const exists = await UserRegister.findOne({ email: email.toLowerCase() });
        if (exists) {
            return res.status(409).json({
                message: "Email already registered",
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await UserRegister.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            companyName,
            gstNumber
        });

        // Token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
// for login user

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserRegister.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "Email not registered",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password",
                success: false
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            success: false
        });
    }
};


// get all data 

export const GetUser = async (req, res) => {
    try {
        const UserData = await UserRegister.find()
        res.json({
            messege: "User Found",
            success: true,
            data: UserData
        })
    } catch (error) {
        res.json({
            messege: "something went wrong",
            success: false
        })
    }
}
