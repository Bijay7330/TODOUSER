import mongoose from "mongoose";
import dotenv from 'dotenv/config';

const url = process.env.url;

export const dbConnect =async(req,res)=>{
   try {
    await mongoose.connect(url);
    console.log("Mongodb is connected");
   } catch (error) {
     console.log('Mongodb is not connected');
   }
}