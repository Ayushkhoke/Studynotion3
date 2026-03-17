import toast from 'react-hot-toast';
import { student } from './apis';
import { apiConnector } from './apiconnector';

import { setPaymentLoading } from '../slices/courseSlice';
import { resetCart } from "../slices/cartSlice";



// function loadScript(src) {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.onload = () => {
//             resolve(true);
//         }
//         script.onerror = () => {
//             resolve(false);
//         }
//         document.body.appendChild(script);
//     });
// }

// export async function buyCourse(token, user, courses, navigate, dispatch) {
//     const toastId = toast.loading("Loading payment gateway...");
//     try {
//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//         if (!res) {
//             toast.error("Razorpay SDK failed to load", { id: toastId });
//             return;
//         }

//         //create order      
//         const orderResponse = await apiConnector("POST", student.COURSE_PAYMENT_API, { courses }, {
//             Authorization: `Bearer ${token}`,
//         });
//         if (!orderResponse.data.success) {
//             toast.error("Could not initiate payment", { id: toastId });
//             return;
//         }
//         const options = {
//             key: process.env.REACT_APP_RAZORPAY_KEY,
//             amount: `${orderResponse.data.data.amount}`,
//             currency: orderResponse.data.data.currency,
//             order_id: orderResponse.data.data.id,
//             name: "Prepro",
//             description: "Course Purchase",
//             image: "https://prepro.co.in/logo.png",
//             prefill: {
//                 name: user.name,
//                 email: user.email,

//             },
//             method:{
//  upi: true,          // ✅ REQUIRED
//   card: true,
//   netbanking: true,
//   wallet: true,
//   paylater: true,
//             },
            
//             handler: function (response) {
//                 sendPaymentSuccessEmail(response, orderResponse.data.data.courses);
//                 verifyPayment({
//                     ...response,
//                     courses: courses,
//                 }, token, navigate, dispatch);
//             }
//         };
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", function (response) {
//             toast.error("Oops, payment failed");
//             console.log(response.error);
//         });
//     }
//     catch (error) {
//         console.log("  error in buycourse", error);
//         toast.error("Something went wrong while loading payment gateway", { id: toastId });
//         return;
//     }
//     console.log("Razorpay key:", process.env.REACT_APP_RAZORPAY_KEY);

// }



// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// export async function buyCourse(token, user, courses, navigate, dispatch) {
//   const toastId = toast.loading("Loading payment gateway...");

//   try {
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );
//     if (!res) {
//       toast.error("Razorpay SDK failed to load", { id: toastId });
//       return;
//     }

//     // CREATE ORDER
//     const orderResponse = await apiConnector(
//       "POST",
//       student.COURSE_PAYMENT_API,
//       { courses },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!orderResponse.data.success) {
//       toast.error("Could not initiate payment", { id: toastId });
//       return;
//     }

//     console.log("Razorpay key:", process.env.REACT_APP_RAZORPAY_KEY);

//     // 🔴 IMPORTANT FIXES ARE HERE
//     const options = {
//       key: process.env.REACT_APP_RAZORPAY_KEY,

//       // ✅ MUST be NUMBER (not string)
//       amount: Number(orderResponse.data.data.amount),

//       currency: orderResponse.data.data.currency,
//       order_id: orderResponse.data.data.id,

//       name: "Prepro",
//       description: "Course Purchase",
//       image: "https://prepro.co.in/logo.png",

//       prefill: {
//         name: user.name,
//         email: user.email,
//       },

//       // ✅ KEEP ONLY THESE IN TEST MODE
//       method: {
//         upi:true,          // ✅ REQUIRED
//         wallet: true,
//         paylater: true,
//         card: true,
//         netbanking: true,
//       },

//       handler: function (response) {
//         sendPaymentSuccessEmail(
//           response,
//           orderResponse.data.data.courses
//         );

//         verifyPayment(
//           {
//             ...response,
//             courses: courses,
//           },
//           token,
//           navigate,
//           dispatch
//         );
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//     paymentObject.on("payment.failed", function (response) {
//       toast.error("Oops, payment failed");
//       console.log(response.error);
//     });
//   } catch (error) {
//     console.log("error in buyCourse", error);
//     toast.error("Something went wrong", { id: toastId });
//   }
// }
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}



export async function buyCourse(token, user, courses, navigate, dispatch) {
  const toastId = toast.loading("Loading payment gateway...");

  try {
    // 1️⃣ Load Razorpay
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load", { id: toastId });
      return;
    }

    // 2️⃣ Create order
    const orderResponse = await apiConnector(

      "POST",
      student.COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      toast.error("Could not initiate payment", { id: toastId });
      return;
    }

    const orderData = orderResponse.data.data;


    console.log("Frontend Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY);
console.log("Order Data:", orderData);
    // 3️⃣ Razorpay options (NO method block)
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: Number(orderData.amount),
      currency: orderData.currency,
      order_id: orderData.id,

      name: "Prepro",
      description: "Course Purchase",
      // image: "https://prepro.co.in/logo.png",

      prefill: {
        name: user.name,
        email: user.email,
      },

      method: {
        card: true,
        netbanking: true,
        upi: false,
        wallet: false,
        paylater: false,
      },

      handler: function (response) {
        verifyPayment(
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courses: courses,
          },
          token,
          navigate,
          dispatch
        );
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function () {
      toast.error("Payment failed");
    });

  } catch (error) {
    console.log("Error in buyCourse:", error);
    toast.error("Something went wrong", { id: toastId });
  }

  toast.dismiss(toastId);
}

// async function sendPaymentSuccessEmail(paymentDetails, courses, token) {
//     try {
//         await apiConnector("POST", student.SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId: paymentDetails.razorpay_order_id,
//             paymentId: paymentDetails.razorpay_payment_id,
//             amount: paymentDetails.razorpay_amount,
//             courses: courses,
//         }, {
//             Authorization: `Bearer ${token}`,
//         }
//         );
//     }
//     catch (error) {
//         console.log("error in sending payment success email", error);

//     }

// }

// verify payment

async function sendPaymentSuccessEmail(paymentDetails, token) {
  try {
    await apiConnector(
      "POST",
      student.SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: paymentDetails.razorpay_order_id,
        paymentId: paymentDetails.razorpay_payment_id,
        // ❌ razorpay_amount does NOT exist
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("Error sending payment success email:", error);
  }
}


async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment, please wait...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", student.COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            toast.error("Payment verification failed");
            dispatch(setPaymentLoading(false));
            return;
        }
        toast.success("Payment successful");
        navigate("/student/enrolled-courses");
        dispatch(resetCart());
    }
    catch (error) {
        console.log("error in verifying payment", error);
        toast.error("Something went wrong during payment verification", { id: toastId });
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}



