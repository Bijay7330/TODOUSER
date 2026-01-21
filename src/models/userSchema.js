import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isLogin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export default mongoose.model('user',userSchema);