import express from 'express';
import { login, signup, sendOtp, changepassword, logout } from "../controllers/Auth.js";
import { resetpasswordToken, resetpassword } from "../controllers/ResetPassword.js";
import { contactUs } from '../controllers/Contact.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendOtp);
router.post("/changepassword", auth, changepassword);
router.post("/reset-Password-Token", resetpasswordToken);
router.post("/reset-Password", resetpassword);
router.post("/contact", contactUs);
router.post("/logout", logout);

export default router;