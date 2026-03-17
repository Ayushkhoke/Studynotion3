// import React from  'react'
// import { sidebarLinks } from '../../data/dashboard-links';
// import {logout} from '../../../services/authAPI'
// import { IoIosLogOut } from "react-icons/io";
// import SidebarLink from './SidebarLink';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import{useState} from 'react';
// import ConfirmationModel from '../../Comman/ConfirmationModel';
// const Sidebar=()=>{
//     const{user,loading:profileloading}=useSelector((state)=>state.profile);
//     const{loading:authloading}=useSelector((state)=>state.auth);
//      const dispatch=useDispatch();
//      const navigate=useNavigate();
//      const[confirmationModel,setconfirmationModel]=useState(null);
//     if(profileloading ||authloading){
//         return(
//             <div className="mt-18">
//                 loading ..
//             </div>
//         )
//     }
//     return(
//         <div className="text-white bg-black">
//       <div className="flex min-w-[222px] flex-col border-r-[1px] boorder-r-black-700 h-[calc(100vh-3.5rem)] bg-grey-800 py-18">
//   <div>
//     {
//         sidebarLinks.map((link,index)=>{

//             if(link.type && user?.accountType!==link.type) return null;
//             return(
//                 <SidebarLink  key={link.id} link={link} iconName={link.icon} />
//         )
            
// })
//     }
//   </div>
//   <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-grey-600'>

// <div>
//     <SidebarLink 
//     link={{name:"Settings",path:"dashboard/settings"}}
//     iconName="VscSettingsGear"/>
    
    
//     <button onClick={()=>setconfirmationModel({
//         text1:"Are You Sure",
//         text2:"you will beLogged out of your account",
//         btn1Text:"Logout",
//         btn2Text:"Cancel",
//         btn1Handler:()=>dispatch(logout(navigate)),
//         btn2handller:()=> setconfirmationModel(null),
//     })}
//     className="text-sm font-medium  text-gray-600"
//     >
// <div className="flex items-center gap-x-2">
    
// <IoIosLogOut />

// </div>
//     </button>
// </div>
//   </div>
//       </div>
//       {confirmationModel && <ConfirmationModel modelData={confirmationModel}/>}
//         </div>
//     )
// }

// export default  Sidebar;

import React, { useState } from "react";
import { sidebarLinks } from "../../data/dashboard-links";
import { logout } from "../../../services/authAPI";
import { IoIosLogOut } from "react-icons/io";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModel from "../../Comman/ConfirmationModel";
import { VscSettingsGear } from "react-icons/vsc";
import StudynotionLogo from '../../../assets/Studynotionlogo.png';

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModel, setConfirmationModel] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="mt-18">Loading...</div>;
  }

  return (
    <aside className="bg-[#111] text-white flex flex-col justify-between h-[calc(100vh-3.5rem)] border-r border-gray-800 shadow-lg">
      {/* Top: Brand */}
      <div className="w-[230px] ">
        <div className="px-6 py-5 flex items-center gap-3">
          {user?.image ? (
            <img src={user.image} alt="profile" className="w-8 h-8 rounded-full border-2 border-yellow-400" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold border-2 border-yellow-400">
              {user?.firstName ? user.firstName[0].toUpperCase() : 'U'}
            </div>
          )}
          <span className="text-xl font-bold text-yellow-400 tracking-wide select-none">Studynotion</span>
        </div>
        <div className="px-2">
          {/* Main Links */}
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return <SidebarLink key={link.id} link={link} logo={link.logo} />;
          })}
          {/* Settings */}
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: VscSettingsGear,
              logo: StudynotionLogo,
            }}
          />
        </div>
      </div>

      {/* Bottom: Avatar & Sign Out */}
      <div className="px-6 py-5 border-t border-gray-800 flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
          {user?.firstName ? user.firstName[0].toUpperCase() : 'N'}
        </div>
        {/* Sign Out Button */}
        <button
          onClick={() =>
            setConfirmationModel({
              text1: "Are You Sure?",
              text2: "You will be logged out of your account",
              btn1Text: "Sign Out",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModel(null),
            })
          }
          className="text-red-400 font-semibold text-base flex items-center gap-2 hover:text-red-500 transition"
        >
          <IoIosLogOut className="text-xl" />
          <span>Sign Out</span>
        </button>
      </div>
      {confirmationModel && (
        <ConfirmationModel modelData={confirmationModel} />
      )}
    </aside>
  );
};

export default Sidebar;
