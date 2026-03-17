import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/authAPI';

const ProfileDropDown = () => {
	const user = useSelector((state) => state.profile.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		}
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	// Get initials for avatar
	const getInitials = () => {
		if (user?.firstName && user?.lastName) {
			return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
		} else if (user?.firstName) {
			return user.firstName[0].toUpperCase();
		} else {
			return 'U';
		}
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="flex items-center gap-3 focus:outline-none"
				aria-haspopup="true"
				aria-expanded={open}
			>
				{user?.image ? (
					<img
						src={user.image}
						alt={`profile-${user?.firstName}`}
						className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
					/>
				) : (
					<div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
						{getInitials()}
					</div>
				)}
				<IoIosArrowDown className={`text-2xl text-white transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
			</button>
			<div
				className={`absolute right-0 mt-2 min-w-[180px] max-w-[90vw] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-xl shadow-xl border border-gray-700 transition-all duration-300 z-50 ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'} md:min-w-[160px]`}
				role="menu"
				aria-label="Profile actions"
				style={{ top: '100%', right: 0 }}
			>
				<button
					className="w-full px-6 py-4 text-left font-medium text-lg hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors duration-200 md:px-5 md:py-3"
					onClick={() => { setOpen(false); navigate('/dashboard/my-profile'); }}
					role="menuitem"
				>
					Dashboard
				</button>
				<button
					className="w-full px-6 py-4 text-left font-medium text-lg hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors duration-200 border-t border-gray-600 md:px-5 md:py-3"
					onClick={() => { setOpen(false); dispatch(logout(navigate)); }}
					role="menuitem"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

// export default ProfileDropDown;



// import React from 'react'
// import { useSelector } from 'react-redux';
// import { IoIosArrowDown } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// const ProfileDropDown=()=>{
//      const user=useSelector((state)=>state.profile.user);
//      const navigate=useNavigate();
//     return(
//         <div onClick={()=>(<div>
//          <button onClick={()=>navigate("/dashboard/my-profile")}>Dashboard</button>
//                   <button onClick={()=>navigate("/login")}>logout</button>
//             </div>)}> 
//     <img src={user?.image} alt={`profile-${user?.firstName}`} className="w-[50px] h-[50px] rounded-full"/>
//     <IoIosArrowDown />
//         </div>
//     )
// }

// export default ProfileDropDown;
export default ProfileDropDown;
