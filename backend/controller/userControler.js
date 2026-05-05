

import UserRegister from '../models/userModel.js';
import Product from '../models/productModel.js'
import HandleError from '../helpers/HandelError.js'; 
import bcrypt from 'bcryptjs';
import { sendToken } from '../helpers/jwtToken.js';
import sendEmail from '../helpers/sendEmail.js';

import crypto from 'crypto';




export const registerUser=async(req,res,next)=>{
const {name,email,password,phoneNumber}=req.body;

//  console.log(req.body);
if(!name){
    return next(new HandleError("Please enter your name",400));
}
if(!email){
    return res.status(400).json({success:false,message:"Please enter your email"});
}
if(!password){
    return res.status(400).json({success:false,message:"Please enter your password"});
}

const userdetail=await UserRegister.create({
    name,
    email,
    password,
    phoneNumber,
    Avathor:{
        public_id:"this is a sample id",
        url:"profilepicUrl",
    },
  });
  const token=userdetail.getJWTToken();
  console.log(token);
  //options for cookie
  res.status(201).json({
    success:true,
    message:"user registered successfully",
    userdetail,token
  });
}


export const loginUser=async(req,res,next)=>{
    //const {email,password}=req.body;  
    const email=req.body.email;
    const password=req.body.password;
    if(!email ){
        return next(new HandleError("Please enter email and password",400));
    } 
    if(!password){
        return next(new HandleError("Please enter email and password",400));
    }
    const user=await UserRegister.findOne({email}).select("+password");
    console.log('view',user)
    sendToken(user,200,res);
    if(!user){
        return next(new HandleError("Invalid email or password",401));
    }
    const isPasswordMatched=await bcrypt.compare(password,user.password);
    if(!isPasswordMatched){ 
        return next(new HandleError("Invalid email or password",401));
    }
   
}
export const logoutUser=async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"user logged out successfully",
      });
}

export const forgetPassword =async function(req, res, next){
    const user=await UserRegister.findOne({email:req.body.email});
   
    if(!user){
        return next(new HandleError("User not found",404));
    }   
    //get reset token
    var resetToken;
    try{
       
        resetToken=await user.token();
       
        console.log(resetToken);
        await user.save({validateBeforeSave:false});    
        console.log("token "+resetToken); 
        console.log(user);

    }
    catch(error){
        return next(new HandleError(error.message,500));
    }
    const messageHtml=`<div style="font-family: Arial, sans-serif; padding: 20px;">
    <p style="font-weight: bold;">Your password reset token is as follow:</p>
    <p style="font-weight: bold;"><a style="color: blue; text-decoration: underline;" href="${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}">Reset Password</a></p>
    <p style="font-weight: bold;">If you have not requested this email,then please ignore it.</p>
    <p style="font-weight: bold;">link valid for 15 minutes only.</p>
    </div>`;
    //create reset password url
      const resetUrl=`${req.protocol}://${req.get("host")}/api/v1/reset/${resetToken}`;
      console.log(resetUrl);
      const message=`Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email,then please ignore it.\n\nlink valid for 15 minutes only.`;
    try{
        await sendEmail({
            email:user.email,
            subject:"Ecomers Password Recovery",
            message,
            text:message,
            htmlMeessage:messageHtml,
            icon:process.env.SMTP_ICON,
            address:"Ecomers Support Team",
        }); 


        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
            resetToken,
        });
      
    }   
    catch(error){
        console.log(error);
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});    
         return next(new HandleError(error.message,500));
    }   
}

export const resetPassword=async(req, res, next)=>{   
    //hash url token
    console.log(req.params.token)
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    console.log(resetPasswordToken)
    const user=await UserRegister.findOne({
        resetPasswordToken,
        resetPasswordToken:{$gt:Date.now()}




        
    });

    if(!user){
        return next(new HandleError("Reset password token is invalid or has been expired",400));
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new HandleError("Password does not password",400));
    }   
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
}   
export const getUserDetails=async(req,res,next)=>{
    const user=await UserRegister.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    });
}   

export const updatePassword=async(req,res,next)=>{
    const user=await UserRegister.findById(req.user.id).select("+password");
    const isPasswordMatched=await bcrypt.compare(req.body.oldPassword,user.password);
    if(!isPasswordMatched){
        return next(new HandleError("Old password is incorrect",400));
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new HandleError("password does not match",400));
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
}
export const updateProfile=async(req,res,next)=>{
    const newUserData={
        name:req.body.name || undefined,
        email:req.body.email || undefined,
    }
  

    //we will add cloudinary later
    const user=await UserRegister.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,     
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        message:'Profile Udate Success Fully',
        user
    });
}   
//get all users(admin)
export const getAllUser=async(req,res,next)=>{
    const users=await UserRegister.find();
    res.status(200).json({
        success:true,
        users,
    });
}
//get single user(admin)
export const getSingleUser=async(req,res,next)=>{
    const user=await UserRegister.findById(req.params.id);
    if(!user){
        return next(new HandleError(`User does not found with id:${req.params.id}`));
    }
    res.status(200).json({
        success:true,
        user,
    });
}
//update user role --admin
export const updateUserRole=async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,   
        role:req.body.role,
    }
    const user=await UserRegister.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
    });
}   
// //delete user --admin
export const deleteUser=async(req,res,next)=>{
    const user=await UserRegister.findById(req.params.id);  
    if(!user){
        return next(new HandleError(`User does not found with id:${req.params.id}`));
    }
    await user.remove();
    res.status(200).json({
        success:true,
    });
}
  



//export con