import mongoose, { Schema } from "mongoose";

const User_Register_Schema = new Schema({
    name:String,
    email:String,
    password:String
})

export  const  UserRegister  =  mongoose.model("User_Registration",User_Register_Schema);