import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/authAPI";
import { FiUser, FiLock, FiLogOut } from "react-icons/fi";

export default function Settings() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Account Settings
        </h1>
        <p className="text-sm text-richblack-400 mt-1">
          Manage your account information and security
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PROFILE INFO */}
        <div className="lg:col-span-2 bg-richblack-800 border border-richblack-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiUser className="text-yellow-400" />
            <h2 className="text-lg font-semibold">
              Profile Information
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase text-richblack-400">
                Full Name
              </p>
              <p className="mt-1 font-medium">
                {user?.firstname} {user?.lastname}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-richblack-400">
                Email Address
              </p>
              <p className="mt-1 font-medium break-all">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-richblack-800 border border-richblack-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiLock className="text-yellow-400" />
            <h2 className="text-lg font-semibold">
              Security
            </h2>
          </div>

          <p className="text-sm text-richblack-400 mb-4">
            Update your password to keep your account secure.
          </p>

          <button
            onClick={() => navigate("/update-password/token")}
            className="w-full bg-yellow-400 text-black py-2 rounded-md font-medium hover:opacity-90"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="mt-8 bg-richblack-800 border border-red-500/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-red-400">
          <FiLogOut />
          <h2 className="text-lg font-semibold">
            Danger Zone
          </h2>
        </div>

        <p className="text-sm text-richblack-400 mb-4">
          Logging out will end your current session.
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md font-medium"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
