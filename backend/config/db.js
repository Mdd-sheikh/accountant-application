import mongoose from "mongoose";


const DbConeection = async() =>{
  try {
       await mongoose.connect("mongodb+srv://bookwise1669_db_user:bookwise1916@cluster0.bzs6hw8.mongodb.net/?appName=Cluster0");
       console.log("db connected");
       
  } catch (error) {
    console.log("error in Dbconnection");
    
  }

}

export default DbConeection;