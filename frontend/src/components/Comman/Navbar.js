// import React from 'react'
// import Logo from "../../assets/Studynotionlogo.png"
// import {Link } from 'react-router-dom'
// import {NavbarLinks} from '../data/navbar-links'
// import {useLocation,matchPath } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { FaShoppingCart } from "react-icons/fa";
// import { FaAngleDown } from "react-icons/fa";
// import ProfileDropDown from '../core/Auth/ProfileDropDown'
// import {categories} from '../../services/apis'
// import {useState,useEffect} from 'react'
// import { apiConnector } from '../../services/apiconnector'
// export default function Navbar() {

//   const {token}=useSelector((state)=>state.auth);
//     const{user}=useSelector((state)=>state.profile);
//   const { totalItems } = useSelector((state) => state.cart); 

//     const location=useLocation();

//     const subLinks=[
//       {
//    title:"python",
//    link:'/catalog/python'
//       },
//             {
//    title:"Webdevelopement",
//    link:'/catalog/Webdevelopement'
//       }
//     ];

//     // const {subLinks,setSubLinks}=useState([]);
   
// //       const fetchSublinks=async()=>{
// //       try{
// //    const result=apiConnector("GET",categories.CATEGORIES_API);
// //    console.log("printing sublink result");
// //    setSubLinks(result.data.data)
// //       }
// //       catch(err){
// //       console.log("could not fetch category list")
// //       }
// //      }
// //      useEffect(()=>{
// // fetchSublinks();
// //      },[])
  
//     const matchroute=(route)=>{
//     return matchPath({path:route},location.pathname)
//     }
//   return (
//     <div className="flex h-14 items-center justify-center bg-black text-white  border-b-[1px] border-b-gray-600">  
//        <div className="flex w-11/12 max-w-maxContent items-center justify-between ">
//        {/* Image */}
//        <Link to="/">
//        <img src={Logo} width={160} height={42} loading='lazy'alt="Website Logo"/>
//        </Link>


// <nav>
//     <ul className="flex gap-x-6 text-white ">
//       {
//         NavbarLinks.map((link,index)=>(
          
//                 <li key={index}>
//       {
//         link.title==="Catalog"?(<div className='relative flex flex-row justify-center items-center gap-2 group'>
//           <p>{link.title}</p>
//            <FaAngleDown className="text-white" />

//            <div className='w-[150px] translate-x-[-50%] translate-y-[10%]  invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-white p-4 text-black-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg-w-[300px] '>
//     <div className="absolute translate-y-[-30%] translate-x-[50%] left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-white"> 

//            </div>

//                     {
//             subLinks.length?(
   
//       subLinks?.map((sublink,index)=>(
//       <div key={index}>
//         <Link to={sublink.link}>
//         <p className="text-black">{sublink.title}</p>
//         </Link>
//         </div>

//       ))
   
//             ):(<div></div>)
//            }
//            </div>
  
       
//         </div>):(
//             <Link to={link?.path}>
//                 <p className={`${matchroute(link?.path)?"text-yellow-500":"text-white"}`}>
//                     {link.title}
//                 </p>
//             </Link>
//         )
//       }
//                 </li>

            
//         ))
//       }
//     </ul>
// </nav>


// <div className="flex gap-x-4 items-center">

//   {
//     user && user?.accountType !== "Instructor" &&(
//       <Link to="/dashboard/cart" className="relative">
// <FaShoppingCart />
// {
//   totalItems>0 &&(
//     <span>
//       {totalItems}
//     </span>
//   )
// }
//       </Link>
//     )
//   }


// {/* 
//   <Link to="/signup" >
// <button className="text-white ">
//   Sign up
// </button>
//   </Link>

//   <Link to="/login"  className="text-white  bg-gray-800">
// <button>
//   Login
// </button>
//   </Link> */}


//   {
//     token === null &&(
//       <Link to="/login">
//         <button className="border border-black bg-gray-800 px-[12px] py-[8px] text-white rounded-md">
//           Log in
//         </button>
//       </Link>
//     )
    
//   }
//     {
//     token === null &&(
//       <Link to="/signup" className="border border-black bg-gray-800 px-[12px] py-[8px] text-white rounded-md">
//         <button>
//            Signup
//         </button>
//       </Link>
//     )
    
//   } 
//    {
//     token !== null && <ProfileDropDown/>
//   }

// </div>
//         </div> 
//     </div>
//   )
// }



import React, { useState } from 'react'
import Logo from "../../assets/Studynotionlogo.png"
import { Link, useLocation, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../data/navbar-links'
import { useSelector } from 'react-redux'
import { FaShoppingCart, FaAngleDown, FaBars, FaTimes } from "react-icons/fa"
import ProfileDropDown from '../core/Auth/ProfileDropDown'

export default function Navbar() {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const location = useLocation()
  const [mobileMenu, setMobileMenu] = useState(false)

  const subLinks = [
    { title: "Python", link: "/catalog/python" },
    { title: "Web Development", link: "/catalog/Webdevelopement" }
  ]

  const matchroute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className="h-14 bg-black text-white border-b border-gray-600 flex items-center ">
      <div className="w-11/12 mx-auto flex justify-between items-center">

        {/* ================= LOGO ================= */}
        <Link to="/">
          <img src={Logo} width={140} loading="lazy" alt="Logo" />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative group flex items-center gap-1 cursor-pointer">
                    <p>{link.title}</p>
                    <FaAngleDown />

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3
                                    invisible opacity-0 group-hover:visible group-hover:opacity-100
                                    bg-white text-black rounded-md p-4 w-48 transition-all">
                      {subLinks.map((sublink, i) => (
                        <Link key={i} to={sublink.link}>
                          <p className="py-1 hover:text-yellow-500">
                            {sublink.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p className={matchroute(link.path) ? "text-yellow-500" : ""}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ================= RIGHT ACTIONS ================= */}
        <div className="hidden lg:flex gap-x-4 items-center">

          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to="/login">
                <button className="bg-gray-800 px-3 py-1 rounded-md">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-gray-800 px-3 py-1 rounded-md">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        {/* ================= MOBILE MENU ICON ================= */}
        <button
          className="lg:hidden text-xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenu && (
        <div className="absolute top-14 left-0 w-full bg-black text-white
                        flex flex-col gap-4 px-6 py-6 lg:hidden z-50">

          {NavbarLinks.map((link, index) => (
            <div key={index}>
              {link.title === "Catalog" ? (
                <div>
                  <p className="font-semibold mb-2">Catalog</p>
                  {subLinks.map((sublink, i) => (
                    <Link key={i} to={sublink.link} onClick={() => setMobileMenu(false)}>
                      <p className="pl-4 py-1 text-gray-300">
                        {sublink.title}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link to={link.path} onClick={() => setMobileMenu(false)}>
                  <p className="py-1">{link.title}</p>
                </Link>
              )}
            </div>
          ))}

          <hr className="border-gray-700" />

          {token === null && (
            <>
              <Link to="/login" onClick={() => setMobileMenu(false)}>
                <button className="w-full bg-gray-800 py-2 rounded-md">
                  Log in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenu(false)}>
                <button className="w-full bg-gray-800 py-2 rounded-md">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      )}
    </div>
  )
}

