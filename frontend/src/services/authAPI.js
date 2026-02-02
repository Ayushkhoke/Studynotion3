import {toast} from "react-hot-toast"
import { setLoading,setToken,setLoggedin } from "../slices/authSlice";
import{setUser} from '../slices/profileSlice'
import {apiConnector} from './apiconnector'
import { resetpassword,auth } from "./apis";





export function sendOtp(email){
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try{
   const res=await apiConnector("POST",auth.SENDOTP_API,{email,checkUserPresent:true,})
   console.log("otp response",res);

   if(!res.data.success){
    throw new Error(Response.data.message)
   }
   toast.success("Otp send succesfully")
  
    }
    catch(error){
      console.log("send api erorr ",error)
      toast.error("could not send otp")
    }
    dispatch(setLoading(false))
  
  }
}




///signup

export function signup(firstname, lastname, email, password, confirmpassword, accountType, otp, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("POST", auth.SIGNUP_API, {
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        accountType,
        otp,
      });

      console.log(res);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Signup successfully");
      navigate("/dashboard/my-profile");  // or dashboard
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      toast.error("Failed to Signup");
    }
    dispatch(setLoading(false));
  };
}

//contacct  us
export function Contact(firstname, lastname, email, phone, message, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("POST", auth.CONTACT_API, {
        firstname,
        lastname,
        email,
        phone,
        message,
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Contact message sent successfully");
      navigate("/");
    } catch (error) {
      console.log("CONTACT ERROR:", error);
      toast.error("Failed to send contact message");
    }
    dispatch(setLoading(false));
  };
}

 



//login


export function  login(email,password,navigate){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
     const res=await apiConnector("POST",auth.LOGIN_API,{email,password})

     console.log("resonse of login",res);
    if (!res.data.success){
      throw new Error(res.data.message);

     }

     toast.success("Login successfully");
     dispatch(setToken(res.data.token));
     const userImage=res.data?.user?.image
        ?res.data.user.image
        :`https://api.dicebear.com/5.x/initials/svg?seed=${res.data.user.firstname}`
     console.log("after set user",res.data.user);
        dispatch(setUser({...res.data.user,image:userImage}));
localStorage.setItem("token", JSON.stringify(res.data.token));
localStorage.setItem("user", JSON.stringify(res.data.user));
       navigate('/dashboard/my-profile')
    }
    catch(error){
 console.log("Login ERROR:", error);
      toast.error("Failed to Login");
    }
    dispatch(setLoading(false));
  };
}



export function getPasswordResetToken(email,setemailSent){
    return async(dispatch)=>{
      dispatch(setLoading(true));
    
    //check from body email
      try{ 
       const res= await apiConnector("POST",resetpassword.RESETPASSWORDTOKEN_API,{email})
         console.log("Reset password token response ",res);

         if(!res.data.success){
           throw new Error(res.data.message);
         }
         toast.success("Reset email sent")
        setemailSent(true);
    }
    catch(error){
console.log("reset password token error");
toast.error("Failed to send reset email");
    }
       dispatch(setLoading(false));
    }
}


export function resetPassword(password,confirmPassword,token){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
    const res=await apiConnector("POST",resetpassword.RESETPASSWORD_API,{password,confirmPassword,token})
    console.log("reset password",res);
    if(!res.data.success){
         throw new Error(res.data.message);
    }
    toast.success("password is reset")
    }
    catch(error){
      console.log("reset password error");
toast.error("Failed to reset password");  
    }
     dispatch(setLoading(false));
  }
}

export function logout(navigate){
  return(dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    //  dispatch(resetCart(null))
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     toast.success(" logged out");
     navigate("/")
  }
}