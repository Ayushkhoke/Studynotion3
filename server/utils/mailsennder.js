// const nodemailer = require('nodemailer');

// const mailsender = async (email, title, body) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//              port: 587,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS,
//             }
//         })

//         let info = await transporter.sendMail({
//             from: "studynotion || codehelp bybabbber",
//             to: `${email}`,
//             subject: `${title}`,
//             html: `${body}`,
//         })
//         console.log(info);
//         return info;
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailsender;


// const nodemailer = require("nodemailer");

// const mailsender = async (email, title, body) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: process.env.MAIL_PORT || 587,
//       secure: false,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: "StudyNotion Team <starktony1047@gmail.com>", // VERIFIED in Brevo
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("MAIL SENT:", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("MAIL ERROR:", error);
//   }
// };

// module.exports = mailsender;



// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT || 587,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

// const mailsender = async (email, title, body) => {
//   try {
//     const info = await transporter.sendMail({
//       from: "StudyNotion Team <starktony1047@gmail.com>",
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("MAIL SENT:", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("MAIL ERROR:", error);
//   }
// };

// module.exports = mailsender;



// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // TLS
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

// // Verify connection once when server starts
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("SMTP Connection Error:", error);
//   } else {
//     console.log("SMTP Server is ready to take messages");
//   }
// });

// const mailsender = async (email, title, body) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"StudyNotion Team" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("MAIL SENT:", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("MAIL ERROR:", error);
//     throw error;
//   }
// };

// module.exports = mailsender;


import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify connection once when server starts
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages");
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"StudyNotion Team" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("MAIL SENT:", info.messageId);
    return info;
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
};