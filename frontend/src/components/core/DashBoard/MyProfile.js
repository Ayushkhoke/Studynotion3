import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Comman/IconBtn";
import Sidebar from "../DashBoard/Sidebar";
import AIChatbot from "../AI/AIChatbot";
import { apiConnector } from "../../../services/apiconnector";
import { profile } from "../../../services/apis";
import { setUser } from "../../../slices/profileSlice";
import toast from "react-hot-toast";

const MyProfile = () => {
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  // Import setUser from profileSlice
  // Import apiConnector from services/apiconnector
  // Import profile from services/apis
  // Import toast from react-hot-toast
  // (Assume these are available)

  // Inline edit state
  const [editProfile, setEditProfile] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [editPersonal, setEditPersonal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [profileForm, setProfileForm] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
  });
  const [aboutForm, setAboutForm] = useState(user?.additionaldetails?.about || "");
  const [personalForm, setPersonalForm] = useState({
    gender: user?.additionaldetails?.gender || "",
    contactNumber: user?.additionaldetails?.contactNumber || "",
    dateofBirth: user?.additionaldetails?.dateofBirth || "",
  });

  // Save handlers
  const handleSaveAbout = async () => {
    setSaving(true);
    try {
      const res = await apiConnector(
        "PUT",
        profile.UPDATE_PROFILE_API,
        {
          about: aboutForm,
          gender: personalForm.gender || "Not specified",
          contactNumber: personalForm.contactNumber || "Add Contact Number",
          dateofBirth: personalForm.dateofBirth || "",
        },
        { Authorization: `Bearer ${token}` }
      );
      if (res.data && res.data.success) {
        dispatch(setUser({ ...user, additionaldetails: { ...user.additionaldetails, about: aboutForm } }));
        toast.success("About updated");
        setEditAbout(false);
      } else {
        toast.error((res.data && res.data.message) || "Failed to update");
      }
    } catch (err) {
      toast.error((err && err.message) || "Failed to update");
    }
    setSaving(false);
  };

  const handleSavePersonal = async () => {
    setSaving(true);
    try {
      const res = await apiConnector(
        "PUT",
        profile.UPDATE_PROFILE_API,
        {
          about: aboutForm || user?.additionaldetails?.about || "",
          gender: personalForm.gender || "Not specified",
          contactNumber: personalForm.contactNumber || "Add Contact Number",
          dateofBirth: personalForm.dateofBirth || "",
        },
        { Authorization: `Bearer ${token}` }
      );
      if (res.data && res.data.success) {
        dispatch(setUser({ ...user, additionaldetails: { ...user.additionaldetails, ...personalForm } }));
        toast.success("Personal details updated");
        setEditPersonal(false);
      } else {
        toast.error((res.data && res.data.message) || "Failed to update");
      }
    } catch (err) {
      toast.error((err && err.message) || "Failed to update");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 sm:p-8 max-w-full w-full md:w-[1080px] justify-center mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400">
        My Profile
      </h1>

      {/* ===== Profile Card ===== */}
      <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400 mx-auto"
          />
          <div className="text-center md:text-left">
            {editProfile ? (
              <form className="flex flex-col gap-2">
                <input type="text" value={profileForm.firstname} onChange={e => setProfileForm(f => ({ ...f, firstname: e.target.value }))} className="bg-gray-700 text-white rounded px-2 py-1" placeholder="First Name" />
                <input type="text" value={profileForm.lastname} onChange={e => setProfileForm(f => ({ ...f, lastname: e.target.value }))} className="bg-gray-700 text-white rounded px-2 py-1" placeholder="Last Name" />
                <input type="email" value={profileForm.email} onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))} className="bg-gray-700 text-white rounded px-2 py-1" placeholder="Email" />
                <div className="flex gap-2 mt-2">
                  <button type="button" className="bg-yellow-500 text-black px-3 py-1 rounded" onClick={() => setEditProfile(false)}>Save</button>
                  <button type="button" className="bg-gray-600 text-white px-3 py-1 rounded" onClick={() => setEditProfile(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <p className="text-lg font-semibold">{user?.firstname} {user?.lastname}</p>
                <p className="text-gray-300 text-sm break-all">{user?.email}</p>
              </>
            )}
          </div>
        </div>
        <IconBtn text={editProfile ? "Cancel" : "Edit"} onClick={() => setEditProfile(v => !v)} />
      </div>

      {/* ===== About Section ===== */}
      <div className="mt-6 bg-gray-800/70 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
          <p className="text-lg font-semibold">About</p>
          <IconBtn text={editAbout ? "Cancel" : "Edit"} onClick={() => setEditAbout(v => !v)} />
        </div>
        {editAbout ? (
          <form className="flex flex-col gap-2">
            <textarea value={aboutForm} onChange={e => setAboutForm(e.target.value)} className="bg-gray-700 text-white rounded px-2 py-1 min-h-[60px]" placeholder="Write something about yourself" />
            <div className="flex gap-2 mt-2">
              <button type="button" className="bg-yellow-500 text-black px-3 py-1 rounded" onClick={handleSaveAbout} disabled={saving}>Save</button>
              <button type="button" className="bg-gray-600 text-white px-3 py-1 rounded" onClick={() => setEditAbout(false)} disabled={saving}>Cancel</button>
            </div>
          </form>
        ) : (
          <p className="text-gray-300 text-sm">{user?.additionaldetails?.about || "Write something about yourself"}</p>
        )}
      </div>

      {/* ===== Personal Details ===== */}
      <div className="mt-6 bg-gray-800/70 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <p className="text-lg font-semibold">Personal Details</p>
          <IconBtn text={editPersonal ? "Cancel" : "Edit"} onClick={() => setEditPersonal(v => !v)} />
        </div>
        {editPersonal ? (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Gender</p>
              <input type="text" value={personalForm.gender} onChange={e => setPersonalForm(f => ({ ...f, gender: e.target.value }))} className="bg-gray-700 text-white rounded px-2 py-1" placeholder="Gender" />
            </div>
            <div>
              <p className="text-gray-400">Phone Number</p>
              <input type="text" value={personalForm.contactNumber} onChange={e => setPersonalForm(f => ({ ...f, contactNumber: e.target.value }))} className="bg-gray-700 text-white rounded px-2 py-1" placeholder="Phone Number" />
            </div>
            <div>
              <p className="text-gray-400">Date of Birth</p>
              <input type="date" value={personalForm.dateofBirth} onChange={e => setPersonalForm(f => ({ ...f, dateofBirth: e.target.value }))} className="bg-gray-700 text-white rounded px-2 py-1" />
            </div>
            <div className="col-span-1 md:col-span-2 flex gap-2 mt-2">
              <button type="button" className="bg-yellow-500 text-black px-3 py-1 rounded" onClick={handleSavePersonal} disabled={saving}>Save</button>
              <button type="button" className="bg-gray-600 text-white px-3 py-1 rounded" onClick={() => setEditPersonal(false)} disabled={saving}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Detail label="First Name" value={user?.firstname} />
            <Detail label="Email" value={user?.email} />
            <Detail label="Gender" value={user?.additionaldetails?.gender || "Not specified"} />
            <Detail label="Phone Number" value={user?.additionaldetails?.contactNumber || "Add Contact Number"} />
            <Detail label="Date of Birth" value={user?.additionaldetails?.dateofBirth || "Add Date of Birth"} />
          </div>
        )}
      </div>

      {/* ===== AI Chatbot Component ===== */}
      <AIChatbot />
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default MyProfile;
