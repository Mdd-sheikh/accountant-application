import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { UserRegister } from "../models/User.js";
import jwt from "jsonwebtoken";
import validator from 'validator'




export const Registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        
         
        // Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Email is invalid",
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

        // Existing email check
        const exists = await UserRegister.findOne({ email });
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
            email,
            password: hashedPassword
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
            token
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

        const newUser = await UserRegister.findOne({ email });
        if (!newUser) {
            return res.status(404).json({
                message: "Email not registered",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, newUser.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password",
                success: false
            });
        }

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            success: false
        });
    }
};
