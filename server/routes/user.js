const express=require('express');
const router=express.Router();
const{login,signup,sendOtp,changepassword}=require("../controllers/Auth");
const { resetpasswordToken, resetpassword } = require("../controllers/ResetPassword");
const { contactUs } = require('../controllers/Contact');


const{auth}=require('../middleware/auth');

console.log("Auth Controllers:", { login, signup, sendOtp, changepassword });
console.log("Reset Password Controllers:", { resetpasswordToken, resetpassword });
console.log("Middleware Auth:", { auth });
router.post("/login",login)

router.post("/signup",signup)
router.post("/sendotp",sendOtp)
router.post("/changepassword",auth,changepassword)
router.post("/reset-Password-Token",resetpasswordToken)
router.post("/reset-Password",resetpassword)
router.post("/contact", contactUs);

// Logout endpoint
const { logout } = require("../controllers/Auth");
router.post("/logout", logout);

module.exports=router;