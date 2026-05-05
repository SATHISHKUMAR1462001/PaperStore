import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";    
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
//import {generateToken} from '../helpers/jwtToken.js';
const UserShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "   "],
      maxLength: [15, " "],
      minLength: [3, " "],
    },
    email: {
      type: String,
      required: [true, "   "],
      unique: true,
      validate: [validator.isEmail, " "],
    },
    password: {
      type: String,
      required: [true, "   "],
      select: false,
      maxLength: [10, " "],
      minLength: [8, " "],
    },
    phoneNumber: {
      type: Number,
      maxLength: [10, " "],
      minLength: [10, " "],
    },
    Avathor: {
      public_id: {
        type: String,
        required: [true],
      },
      url: {
        type: String,
        required: [true],
      },
    },
    role: {
        type: String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
  },
  { timestamps: true }
);
UserShema.pre("save", async function () {
  if (!this.isModified("password")) {
     return;
  } 
  this.password = await bcrypt.hash(this.password, 10);
  
});


UserShema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{  
        expiresIn:process.env.JWT_EXPIRE,
    }); 
  
};


UserShema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
} ;


UserShema.methods.token=async function(){
    //generate token
    const resetToken=crypto.randomBytes(20).toString("hex");  
    //hashing and adding resetPasswordToken to userShema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+30 *60*1000;
    return  resetToken;
} ;


export default mongoose.model("User",UserShema) ;