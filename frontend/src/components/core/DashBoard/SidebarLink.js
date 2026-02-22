// import React from 'react'
// import { useLocation ,NavLink, matchPath} from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import * as Icons from 'react-icons/vsc'
// export default function SidebarLink({link,iconName}){
// const Icon=Icons[iconName];
// const location=useLocation();

// const dispatch=useDispatch();

// const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
// }

//     return(
// //       <NavLink to={link.path} onClick={()=>{}} className={`relative px-0 py-2 text-sm text-white font-medium ${matchRoute(link.path)?"bg-yellow-500":"bg-opacity-0"}`}>

// // <span
// //   className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-500 ${
// //     matchRoute(link.path) ? "opacity-100" : "opacity-0"
// //   }`}>

// // <div className="flex items-center gap-x-2 ">
// //     <Icon className="text-lg"/>
// //     <span>{link.name}</span>
// // </div>
// // </span>
// //       </NavLink>

// <NavLink
//   to={link.path}
//   className={`relative px-0 py-2 text-sm text-white font-medium ${
//     matchRoute(link.path) ? "bg-yellow-500" : "bg-opacity-0"
//   }`}
// >
//   <div className="flex items-center gap-x-2 relative">
//     <div
//       className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-500 ${
//         matchRoute(link.path) ? "opacity-100" : "opacity-0"
//       }`}
//     ></div>
//     <Icon className="text-lg" />
//     <span>{link.name}</span>
//   </div>
// </NavLink>
//     )
// }


import React from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";

export default function SidebarLink({ link }) {
  const location = useLocation();
  const Icon = link.icon;

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-3 py-2 text-sm font-medium flex items-center gap-x-2 ${
        matchRoute(link.path)
          ? "bg-yellow-500 text-black"
          : "text-white"
      }`}
    >
      <Icon className="text-lg" />
      <span>{link.name}</span>
    </NavLink>
  );
}

