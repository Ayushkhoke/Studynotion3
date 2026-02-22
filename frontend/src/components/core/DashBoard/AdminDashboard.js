import React from "react";
import {
  FaUsers,
  FaRupeeSign,
  FaBook,
  FaShoppingCart,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Users",
    value: "12,480",
    icon: FaUsers,
  },
  {
    title: "Revenue",
    value: "₹8.2L",
    icon: FaRupeeSign,
  },
  {
    title: "Courses",
    value: "148",
    icon: FaBook,
  },
  {
    title: "Orders",
    value: "1,280",
    icon: FaShoppingCart,
  },
];

const AdminDashboard = () => {
  return (
    <section className="min-h-screen bg-richblack-900 text-richblack-25 px-4 sm:px-6 lg:px-8 py-6 text-white">

      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-richblack-400 mt-1">
          Overview of platform activity and performance
        </p>
      </header>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-richblack-800 rounded-xl p-5 flex justify-between items-center border border-richblack-700 hover:border-yellow-400 transition"
            >
              <div>
                <p className="text-sm text-richblack-400">
                  {item.title}
                </p>
                <p className="text-2xl font-bold mt-1">
                  {item.value}
                </p>
              </div>
              <div className="text-3xl text-yellow-400">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-2 bg-richblack-800 rounded-xl p-6 border border-richblack-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Recent Activity
            </h2>
            <button className="text-sm text-yellow-400">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-richblack-400 border-b border-richblack-700">
                  <th className="py-2 text-left">User</th>
                  <th className="py-2 text-left">Action</th>
                  <th className="py-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-richblack-700">
                  <td className="py-3">Rahul Sharma</td>
                  <td>Purchased Course</td>
                  <td>2 min ago</td>
                </tr>
                <tr className="border-b border-richblack-700">
                  <td className="py-3">Anjali Verma</td>
                  <td>New Signup</td>
                  <td>10 min ago</td>
                </tr>
                <tr>
                  <td className="py-3">Amit Kumar</td>
                  <td>Created Course</td>
                  <td>1 hour ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <aside className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
          <h2 className="text-lg font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-3">
            <button className="bg-yellow-400 text-black py-2 rounded-md font-medium hover:opacity-90">
              Add New Course
            </button>
            <button className="bg-richblack-700 py-2 rounded-md hover:bg-richblack-600">
              Manage Users
            </button>
            <button className="bg-richblack-700 py-2 rounded-md hover:bg-richblack-600">
              View Reports
            </button>
          </div>
        </aside>
      </div>

      {/* ANALYTICS */}
      <div className="mt-8 bg-richblack-800 rounded-xl p-6 border border-richblack-700">
        <h2 className="text-lg font-semibold mb-4">
          Revenue Analytics
        </h2>
        <div className="h-64 flex items-center justify-center text-richblack-400">
          Chart Component Goes Here
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
