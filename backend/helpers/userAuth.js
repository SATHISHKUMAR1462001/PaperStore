import HandleError from '../helpers/HandelError.js'; 
import jwt from 'jsonwebtoken';
import UserRegister from '../models/userModel.js';
export const verifyUser=async(req,res,next)=>{
    try{
        let token;  
        if(req.cookies.token){
            token=req.cookies.token;
        }
        if(!token){
            return next(new HandleError("Please login to access this resource",401));
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=await UserRegister.findById(decoded.id);
        next();
    }
    catch(error){
        return next(new HandleError("Please login to access this resource",401));
    }
}
export const roleBasedAccess =(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new HandleError(`Role:${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}




