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


const nodemailer = require("nodemailer");

const mailsender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "StudyNotion Team <starktony1047@gmail.com>", // VERIFIED in Brevo
      to: email,
      subject: title,
      html: body,
    });

    console.log("MAIL SENT:", info.messageId);
    return info;
  } catch (error) {
    console.error("MAIL ERROR:", error);
  }
};

module.exports = mailsender;
