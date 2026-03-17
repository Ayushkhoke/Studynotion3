 const jwt=require('jsonwebtoken');
require('dotenv').config();''
const User=require('../models/User');

//auth
exports.auth=async(req,res,next)=>{
try{
   //extract tokrn
const token =
  req.cookies.token ||
  req.body.token ||
  req.header("Authorization")?.replace("Bearer ", "").trim();

   console.log("token",token);
if(!token){
    return res.status(401).json({
        success:false,
        message:"token not present",
    })
}

//veridy the token
try{
  const decode=await jwt.verify(token,process.env.JWT_SECRET);
  console.log(decode);
  req.user=decode;
}
catch(error){
    // Handle expired token gracefully
    if(error.name === 'TokenExpiredError'){
        return res.status(401).json({
            success:false,
            message:"Session expired. Please login again",
        })
    }
    
    return res.status(401).json({
        success:false,
        message:"token invalid",
    })
}
next();
}
catch(error){
    return res.status(500).json({
        success:false,
        messaget:" something went wrong wentoken not present",
    })
}
}

//isStudent
exports.isStudent=async(req,res,next)=>{
    try{
  if(req.user.accountType !=="Student"){
    return res.status(401).json({
        success:false,
        message:" for student only",
    })
   
  }
  next();
    }
    catch(error){ 
        console.log(error);
        return res.status(500).json({
            success:false,
            messaget:" user role not verified as student",
        }) 
    }
}

//isadmin
exports.isadmin=async(req,res,next)=>{
    try{
  if(req.user.accountType !=="Admin"){
    return res.status(401).json({
        success:false,
        message:" for only isadmin",
    })

  }
  next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            messaget:" user role not verified as admin ",
        }) 
    }
}

//isinstructor

exports.isInstructor=async(req,res,next)=>{
    try{
  if(req.user.accountType !=="Instructor"){
    return res.status(401).json({
        success:false,
        message:" for only isInstructor",
    })
  
  }
  next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            messaget:" user role not verified t infrastructor  ",
        }) 
    }
}
