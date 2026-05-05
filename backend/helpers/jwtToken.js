import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };    

  export const sendToken = (user, statusCode, res) => {
    console.log("Sending token to user:", user);

    const token = user.getJWTToken();   
    console.log("Sending token to user_1:", token);
    //options for cookie    
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite:"Strict"
    };  
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
    });
}   
