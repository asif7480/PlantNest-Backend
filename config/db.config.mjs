import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        // const conn = await mongoose.connect(process.env.MONGODB_URI)
        const conn = await mongoose.connect(process.env.ATLAS_URI)
        console.log(`Connected to: ${conn.connection.host}.`);
        
    }catch(err){
        console.log(`Connection Error: ${err.message}.`);
    }
}