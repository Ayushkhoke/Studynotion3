// import React from 'react'
// import {useSelector} from 'react-redux'
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/core/DashBoard/Sidebar';
// import MyProfile from '../components/core/DashBoard/MyProfile';
// //outlet 
// const Dashboard=()=>{
//  const {loading:authloading}=useSelector((state)=>state.auth);
// const {loading:profileloading}=useSelector((state)=>state.profile);
// const{user}=useSelector((state)=>state.profile);

// if(user==null){
//     return(
//         <div>
//             User is null
//         </div>
//     )
// }
// if(authloading || profileloading){
//     return (
//         <div>
//             loading...
//         </div>
//     )

// }
// return(
//     <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-black">
// <Sidebar/>

// <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
    
//     <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//         <Outlet/>
//     </div>
// </div>
//     </div>
// )
// }
// export default Dashboard;


// import React from "react";
// import { useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/core/DashBoard/Sidebar";

// const Dashboard = () => {
//   const { loading: authloading } = useSelector((state) => state.auth);
//   const { loading: profileloading, user } = useSelector(
//     (state) => state.profile
//   );

//   if (!user) {
//     return <div className="text-white p-6">User is null</div>;
//   }

//   if (authloading || profileloading) {
//     return <div className="text-white p-6">Loading...</div>;
//   }

//   return (
//     <div className="flex min-h-[calc(100vh-3.5rem)] w-full bg-black">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto">
//         {/* 🔥 FULL WIDTH CONTENT */}
//         <div className="w-full px-4 sm:px-8 py-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/DashBoard/Sidebar";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const { loading: authloading, token } = useSelector((state) => state.auth);
  const { loading: profileloading, user } = useSelector(
    (state) => state.profile
  );

  const [showSidebar, setShowSidebar] = useState(false);

  if (!user) {
    return <div className="text-white p-6">User is null</div>;
  }

  if (authloading || profileloading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (

    <div className="flex min-h-[calc(100vh-3.5rem)] w-full bg-black overflow-x-hidden">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden fixed top-14 left-0 w-full z-40 bg-black border-b border-gray-700 flex items-center px-4 py-3">
        <button
          className="text-white text-xl"
          onClick={() => setShowSidebar(true)}
        >
          <FaBars />
        </button>
        <p className="ml-4 text-white font-semibold flex-1">Dashboard</p>
        {/* Login/Signup buttons for mobile users */}
        {(!user && token === null) && (
          <div className="flex gap-2">
            <a href="/login"><button className="bg-yellow-500 text-black px-3 py-1 rounded-md font-semibold text-sm">Log in</button></a>
            <a href="/signup"><button className="bg-yellow-500 text-black px-3 py-1 rounded-md font-semibold text-sm">Sign up</button></a>
          </div>
        )}
      </div>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          h-full bg-black
          transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar closeSidebar={() => setShowSidebar(false)} />
      </div>

      {/* ================= OVERLAY (MOBILE) ================= */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 lg:ml-0 mt-14 lg:mt-0 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <div className="w-full px-4 sm:px-8 py-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
