// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {useState} from 'react'
// import {Link} from "react-router-dom"
// import { resetPassword } from '../services/authAPI'
// import { useLocation } from 'react-router-dom';
// import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
// const UpdatePassword=()=>{
//     const[formdata,setformdata]=useState({password:"",confirmPassword:""})
//     const{loading}=useSelector((state)=>state.auth);
//     const[showpassword,setshowpassword]=useState(false);
//     const{password,confirmPassword}=formdata;
//     const[showconfirmpassword,setshowconfirmpassword]=useState(false);
//      const dispatch=useDispatch();
//      const location=useLocation();
//       function handleonchange(event){
//     setformdata((prev)=>({
//         ...prev,
//         [event.target.name]:event.target.value
//     }))

//   }
//   function handleOnSubmit(e){
//     e.preventDefault();
//     const token=location.pathname.split('/').at(-1);
// dispatch(resetPassword(password,confirmPassword,token))
//   }

//     return(
//         <div>
//             {
//  loading ?(<div>loading ..</div>)
//             :(
//                 <div>
//                  <h1> Choose new Password</h1>
//                  <p>almost doen Enter your new password and your all set</p>  

//                  <form onSubmit={handleOnSubmit}>
//                     <label>
//                         <p>New Password <sup>*</sup>
//                         <input required type={showpassword?"text":"password"} placeholder="password" name="password" value={password} onChange={handleonchange}/></p>
//                            <span onClick={()=>setshowpassword((prev)=>!prev)}>
//                         {
//                             showpassword?(<AiOutlineEyeInvisible />): (<AiOutlineEye />)
//                         }
//                        </span>
//                     </label>
//                                    <label>
//                         <p> connfirm New Password <sup>*</sup>
//                         <input required type={showconfirmpassword?"text":"password"}placeholder="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleonchange}/></p>
//                        <span onClick={()=>setshowconfirmpassword((prev)=>!prev)}>
//                         {
//                             showconfirmpassword?(<AiOutlineEyeInvisible />): (<AiOutlineEye />)
//                         }
//                        </span>
//                     </label>

//                     <button type='submit'>
//                          Reset password
//                     </button>

//                     </form> 

//                     <div>
//                         <Link to="/login">
//                         <p>Back to login</p>
//                         </Link>
//                         </div>
//                 </div>
//             )


//             }
           
//         </div>
//     )
// }


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../services/authAPI";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const UpdatePassword = () => {
  const [formdata, setformdata] = useState({
    password: "",
    confirmPassword: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formdata;

  function handleOnChange(e) {
    setformdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-richblack-900
      bg-[radial-gradient(circle_at_25%_20%,rgba(255,214,10,0.08),transparent_40%),
          radial-gradient(circle_at_80%_80%,rgba(255,214,10,0.05),transparent_40%)]"
    >
      {/* CARD */}
      <div className="w-full max-w-md rounded-2xl p-6 sm:p-8
        bg-richblack-800/95
        border border-richblack-700
        shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-richblack-25">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-richblack-400">
            Choose a strong password to secure your account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleOnSubmit} className="space-y-5">

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-richblack-300 mb-1">
              New Password <sup className="text-red-400">*</sup>
            </label>

            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full rounded-md bg-richblack-700 border border-richblack-600
                px-3 py-2 text-richblack-25 placeholder:text-richblack-400
                focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                cursor-pointer text-richblack-300 hover:text-richblack-100"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm text-richblack-300 mb-1">
              Confirm New Password <sup className="text-red-400">*</sup>
            </label>

            <div className="relative">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm new password"
                className="w-full rounded-md bg-richblack-700 border border-richblack-600
                px-3 py-2 text-richblack-25 placeholder:text-richblack-400
                focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />

              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                cursor-pointer text-richblack-300 hover:text-richblack-100"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-medium py-2.5 rounded-md
            hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-yellow-400 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
