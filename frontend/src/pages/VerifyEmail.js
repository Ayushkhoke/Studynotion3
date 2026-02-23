import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signup } from "../services/authAPI";
import { useNavigate, Link } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, signupData } = useSelector((state) => state.auth);

  // submit OTP
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
    } = signupData;

    dispatch(
      signup(
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        accountType,
        otp,
        navigate
      )
    );
  };

  // protect route
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {loading ? (
        <div className="text-white text-lg animate-pulse">
          Verifying OTP...
        </div>
      ) : (
        <div className="w-full max-w-md bg-[#111827] rounded-xl p-6 sm:p-8 shadow-lg text-white">
          
          {/* HEADER */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">
            Verify Email
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-400 text-center">
            We have sent a 6-digit verification code to your email.
            <br />
            Enter it below to continue.
          </p>

          {/* OTP FORM */}
          <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex flex-col items-center gap-6"
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              containerStyle="flex gap-2 sm:gap-3 justify-center"
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-md bg-[#020617] border border-gray-700 text-white text-xl text-center focus:outline-none focus:border-yellow-400"
                />
              )}
            /> 

            <button
              type="submit"
              disabled={otp.length !== 6}
              className={`w-full rounded-md py-2.5 font-semibold transition ${
                otp.length === 6
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              Verify Email
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
            <Link
              to="/login"
              className="text-gray-400 hover:text-white"
            >
              ← Back to Login
            </Link>

            <button
              onClick={() =>
                signupData?.email &&
                dispatch(sendOtp(signupData.email, navigate))
              }
              className="text-yellow-400 hover:underline"
            >
              Resend Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
