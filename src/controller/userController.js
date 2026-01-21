import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv/config";

export const register = async (req, res) => {
  try {
    const { userId, email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (user) {
      return response.status(400).json({
        success: false,
        message: "Email has already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const data = await userSchema.create({
      userId,
      email,
      password: hashPassword,
    });

    const token = JsonWebTokenError.sign({ userId:data._id }, process.env.secretKey, {
      expiresIn: "10m",
    });
    return response.status(201).json({
      success: true,
      message: "User has successfully been registerd",
      data: data,
    });
  } catch (error) {
    return response.status(500).json({
      success:false,
      message:error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, passowrd } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid authorization",
      });
    }

    const checkPassword = await bcrypt.compare(passowrd, user.password);
    if (!checkPassword) {
      return res.status(404).json({
        success: false,
        message:"Invalid credential"
      });
    }

    return res.status(200).json({
      success:true,
      message:'Login successfully'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
