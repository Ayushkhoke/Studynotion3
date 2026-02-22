const {instance}=require("../config/razorpay");

const User=require("../models/User");
const mailsender=require("../utils/mailsennder");
const courseEnrollementemail =
  require("../mail/templates/courseenrollementemail");






// exports.capturePayment = async (req, res) => {
//   const { courses } = req.body;
//   const userId = req.user.id;

//   if (courses.length === 0) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide Course Id",
//     });
//   }

//   let totalAmount = 0;

//   for (const course_Id of courses) {
//     let course;
//     try {
//       course = await Course.findById(course_Id);
//       if (!course) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find the course with id ${course_Id}`,
//         });
//       }
//       const mongoose = require("mongoose");

//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(200).json({
//           success: false,
//           message: `Student is already enrolled`,
//         });
//       }

//       totalAmount += course.price;
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   const options = {
//     amount: totalAmount * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   };

//   try {
//     const paymentResponse = await instance.orders.create(options);
//     return res.status(200).json({
//       success: true,
//       message: paymentResponse,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Could not initiate order",
//     });
//   }
// };


//verify payment

const mongoose = require("mongoose");
const Course = require("../models/Course");


// exports.capturePayment = async (req, res) => {
//   try {
//     const { courses } = req.body;
//     const userId = req.user.id;

//     // ✅ Validation
//     if (!courses || courses.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide at least one course ID",
//       });
//     }

//     let totalAmount = 0;
//     const uid = new mongoose.Types.ObjectId(userId);

//     // ✅ Calculate total price & validate enrollment
//     for (const courseId of courses) {
//       const course = await Course.findById(courseId);

//       if (!course) {
//         return res.status(404).json({
//           success: false,
//           message: `Course not found: ${courseId}`,
//         });
//       }

//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(400).json({
//           success: false,
//           message: "You are already enrolled in this course",
//         });
//       }

//       totalAmount += course.price;
//     }

//     // ✅ Razorpay order options
//     const options = {
//       amount: totalAmount * 100, // INR → paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     // ✅ Create Razorpay order
//     const paymentResponse = await instance.orders.create(options);

//     return res.status(200).json({
//       success: true,
//       data: paymentResponse, // 🔥 frontend expects `data`
//     });

//   } catch (error) {
//     console.error("CAPTURE PAYMENT ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Could not initiate payment",
//       error: error.message,
//     });
//   }
// };


exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one course ID",
      });
    }

    let totalAmount = 0;
    const uid = new mongoose.Types.ObjectId(userId);

    for (const courseId of courses) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course not found: ${courseId}`,
        });
      }

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in this course",
        });
      }

      totalAmount += course.price;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);

    // ✅ IMPORTANT FIX
    return res.status(200).json({
      success: true,
      data: {
        id: paymentResponse.id,
        amount: paymentResponse.amount,
        currency: paymentResponse.currency,
      },
    });

  } catch (error) {
    console.error("CAPTURE PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment",
    });
  }
};




exports.verifyPayment=async(req,res)=>{
    //get payment details from request body
    console.log("Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET);

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature,courses}=req.body;
    const userId=req.user.id;
  
  
  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
    return res.status(400).json({
        success:false,
        message:"missing payment details",
    })
  }

  let body=razorpay_order_id+"|"+razorpay_payment_id;
  const crypto=require("crypto");
  const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
  .update(body.toString())
  .digest("hex");

  if(expectedSignature===razorpay_signature){
    await enrollStudents(courses,userId);

    return res.status(200).json({
        success:true,
        message:"payment verified and students enrolled successfully",
    })
     
  }
  return res.status(400).json({
    success:false,
    message:"invalid payment details",
  })
}


// const enrollStudents=async(courses,userId)=>{
//   if(!courses || userId){
//     return res.status(400).json({
//         success:false,
//         message:"invalid data provided for enrollment",
//     })
//   }
//   for(const courseId of courses){
//    try{
// const enrolledCourse=await Course.findOneAndUpdate(
//     {_id:courseId},
//     {$push:{studentsEnrolled:userId}},
//     {new:true},
//    );

// if(!enrolledCourse){
//     return res.status(500).json({
//         success:false,
//         message:"could not enroll student in course",
//     })
//   }
//       const enrolledStudent=await User.findOneAndUpdate(
//         {_id:userId},
//         {$push:{courses:courseId}},
//         {new:true},
//        ); 
//         console.log(enrolledStudent);
//         //send mail to student
//         const emailResponse=await mailsender(
//             enrolledStudent.email,
//             "congratulations from codehelp",
//             courseEnrollementemail(`${enrolledStudent.firstName}`,enrolledCourse.courseName),
//         );
//         console.log("email response",emailResponse);

      
//   }
//     catch(error){
//     console.log(error);
//     return res.status(500).json({
//         success:false,
//         message:"internal server error during enrollment",
//         error:error.message,
//        }
//     )


//   }
//   }


  
// }
const enrollStudents = async (courses, userId) => {
  for (const courseId of courses) {

    // 1️⃣ Add student to course
    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { studentsEnrolled: userId } }, // avoid duplicates
      { new: true }
    );

    if (!enrolledCourse) {
      throw new Error("Course not found");
    }

    // 2️⃣ Add course to USER (✅ CORRECT FIELD: courses)
    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { courses: courseId } }, // 🔥 THIS IS THE FIX
      { new: true }
    );

    if (!enrolledStudent) {
      throw new Error("User not found");
    }

    // 3️⃣ Send email (optional)
    await mailsender(
      enrolledStudent.email,
      "Congratulations 🎉",
      courseEnrollementemail(
        enrolledStudent.firstname,
        enrolledCourse.courseName
      )
    );
  }
};



exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id; // ✅ from auth middleware

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided for sending email",
      });
    }

    const enrolledStudent = await User.findById(userId);

    if (!enrolledStudent) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await mailsender(
      enrolledStudent.email,
      "Payment Successful",
      `Congratulations ${enrolledStudent.firstName},
      
Payment successful!

Payment ID: ${paymentId}
Order ID: ${orderId}
Amount: ${amount / 100} INR

Happy Learning!`
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });

  } catch (error) {
    console.log("Error sending payment success email:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while sending payment success email",
    });
  }
};


