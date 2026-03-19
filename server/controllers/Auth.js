// Logout controller
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};
import User from "../models/User.js";
import OTP from '../models/Otp.js';
import Profile from "../models/Profile.js";
import otpgenrator from 'otp-generator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/mailsennder.js';
// dotenv config not needed in ES modules if using import




//otp send
// exports.sendOtp = async (req, res) => {

//     //fetch email feom req boody
//     const { email } = req.body;

//     //check user idf already ec=xist 
//     const checkuserpresent = await User.findOne({ email });
//     try {
//         if (checkuserpresent) {
//             return res.status(401).json({
//                 success: false,
//                 message: "user already register",
//             });
//         }

//         //generate otp
//         var otp = otpgenrator.generate(6, {
//             upperCaseAlphabets: false,
//             lowerCaseAlphabets: false,
//             specialChars: false,
//         });
//         console.log("otp generated ", otp);

//         //check unique otp or not
//         const result = await OTP.findOne({ otp: otp });

//         while (result) {
//             otp = otpgenrator.generate(6, {
//                 upperCaseAlphabets: false,
//                 lowerCaseAlphabets: false,
//                 specialChars: false,
//             });
//             result = await OTP.findOne({ otp: otp });
//         }

//         const otppayload = { email, otp };
//         // create an entry in db

//         const otpbody = await OTP.create(otppayload);
//         console.log(otpbody);
//         //send otp email to the user





//         //return 
//         res.status(200).json({
//             success: true,
//             message: " otp send succesfully",
//             otp,
//         })

//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// exports.sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(401).json({
//         success: false,
//         message: "User already registered",
//       });
//     }

//     let otp = otpgenrator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     let result = await OTP.findOne({ otp });
//     while (result) {
//       otp=otpgenrator.generate(6, {
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false,
//       });
//       result = await OTP.findOne({ otp });
//     }

//     await OTP.create({ email, otp });

//       mailsender(
//       email,
//       "StudyNotion email verification code",
//       `
//       <h2>Your StudyNotion OTP</h2>
//       <p>Hello 👋</p>
//       <p>Your One-Time Password is:</p>
//       <h1 style="letter-spacing:3px;">${otp}</h1>
//       <p>This OTP is valid for 5 minutes.</p>
//       <p>If you didn’t request this, ignore this email.</p>
//       <br/>
//       <p>— StudyNotion Team</p>
//       `
//     );

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to send OTP",
//     });
//   }
// };


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // Generate OTP
    let otp = otpgenrator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Ensure OTP uniqueness
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpgenrator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    // Save OTP in DB
    await OTP.create({ email, otp });

    // Send mail in background (no await for faster response)
        sendEmail(
            email,
            "StudyNotion Email Verification Code",
            `
                <h2>Your StudyNotion OTP</h2>
                <p>Hello 👋</p>
                <p>Your One-Time Password is:</p>
                <h1 style="letter-spacing:3px;">${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
                <p>If you didn’t request this, ignore this email.</p>
                <br/>
                <p>— StudyNotion Team</p>
            `
        ).catch(err => console.log("Mail error:", err));

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};


//signup
export const signup = async (req, res) => {
    try {
        //data fetch from request body

        const { email, firstname, lastname, password, confirmpassword, otp, accountType } = req.body;
        const checkemailpresent = await User.findOne({ email });
        if (!firstname || !lastname || !email || !password || !confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "all field are required in"
            });
        }
        //  2 password match karo
        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "password not matched ",
            })
        }

        //check user already exist
        if (checkemailpresent) {
            return res.status(400).json({
                success: false,
                message: "user already register",
            })
        }

        //find most recent otp
        const recentotp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentotp);

        //validate otp
        if (recentotp.length == 0) {
            //otp not found
            return res.status(400).json({
                success: false,
                message: 'otp not found',
            });
        } else if (otp !== recentotp[0].otp) {
            //invalid otp
            return res.status(400).json({
                success: false,
                message: "invalid otp",
            });
        }

        //hash password
        const hashpassword = await bcrypt.hash(password, 10);

        //create entry in database 

        const profiledetails = await Profile.create({ gender: null, dateofbirth: null, about: null, contactnumber: null })

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashpassword,
            accountType,
            additionaldetails: profiledetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        })

        //return res
        return res.status(200).json({
            success: true,
            message: "your user has created succesfully",
            user
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "user does not created succesfully",
        })
    }
}


//exports login
export const login = async (req, res) => {
    try {
        //get data from body
        const { email, password } = req.body;
        //validataion
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please all details",
            })
        }

        //user exist or not exist 
        const user = await User.findOne({ email }).populate("additionaldetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not exist"
            })
        }
        const payload = {
            email: user.email,
            id: user.id,
            accountType: user.accountType,
        }




        //generate jwt password matc
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            user.token = token;
            user.password = undefined;

            // create  cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: "loged in successfully",
            })
        }

        else {
            return res.status(401).json({
                success: false,
                message: "password incorrect",
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "login failed",
        })

    }
}








export const changepassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({ success: false, message: "New password required" });
        }
        const hashpassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findOneAndUpdate({ email: email },
            { $set: { password: hashpassword } },
            { new: true },
        );
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
            updatedUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error changing password"
        })
    }
}


