// // import React, { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import { apiConnector } from "../../../services/apiconnector";
// // import { course } from "../../../services/apis";
// // import { FiEdit, FiTrash2, FiUsers } from "react-icons/fi";

// // export default function MyCourses() {
// //   const { token } = useSelector((state) => state.auth);
// //   const [courses, setCourses] = useState([]);

// //   useEffect(() => {
// //     const fetchMyCourses = async () => {
// //       try {
// //         const res = await apiConnector(
// //           "GET",
// //           course.INSTRUCTOR_COURSES_API,
// //           null,
// //           {
// //             Authorization: `Bearer ${token}`,
// //           }
// //         );
// //         setCourses(res.data.data);
// //       } catch (error) {
// //         console.log("Error fetching instructor courses");
// //       }
// //     };

// //     if (token) fetchMyCourses();
// //   }, [token]);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 text-white">
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-8">
// //         <div>
// //           <h2 className="text-3xl font-bold tracking-wide">My Courses</h2>
// //           <p className="text-gray-400 text-sm mt-1">
// //             Manage and track your published courses
// //           </p>
// //         </div>
// //       </div>

// //       {/* Empty State */}
// //       {courses.length === 0 ? (
// //         <div className="flex flex-col items-center justify-center mt-24 text-center">
// //           <div className="text-5xl mb-4">📚</div>
// //           <p className="text-gray-400">
// //             You haven’t created any courses yet.
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {courses.map((course) => (
// //             <div
// //               key={course._id}
// //               className="group bg-gray-900/80 border border-gray-800
// //                          rounded-2xl overflow-hidden shadow-lg
// //                          hover:shadow-yellow-500/10 hover:border-yellow-500/40
// //                          transition-all duration-300"
// //             >
// //               {/* Thumbnail */}
// //               <div className="relative">
// //                 <img
// //                   src={course.thumbnail}
// //                   alt={course.courseName}
// //                   className="w-full h-44 object-cover"
// //                 />

// //                 {/* Price Badge */}
// //                 <span className="absolute top-3 right-3 bg-yellow-400
// //                                  text-black text-sm font-semibold px-3 py-1
// //                                  rounded-full shadow">
// //                   ₹ {course.price}
// //                 </span>
// //               </div>

// //               {/* Content */}
// //               <div className="p-4">
// //                 <h3 className="text-lg font-semibold group-hover:text-yellow-400 transition">
// //                   {course.courseName}
// //                 </h3>

// //                 <p className="text-gray-400 text-sm mt-1 line-clamp-2">
// //                   {course.courseDescription}
// //                 </p>

// //                 {/* Stats */}
// //                 <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
// //                   <div className="flex items-center gap-1">
// //                     <FiUsers />
// //                     <span>{course.studentsEnrolled?.length || 0} Students</span>
// //                   </div>
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="flex items-center justify-between mt-5">
// //                   <button
// //                     className="flex items-center gap-2 text-sm text-blue-400
// //                                hover:text-blue-300 transition"
// //                   >
// //                     <FiEdit />
// //                     Edit
// //                   </button>

// //                   <button
// //                     className="flex items-center gap-2 text-sm text-red-400
// //                                hover:text-red-300 transition"
// //                   >
// //                     <FiTrash2 />
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { apiConnector } from "../../../services/apiconnector";
// import { course } from "../../../services/apis";
// import { FiEdit, FiTrash2, FiUsers } from "react-icons/fi";
// import { deleteCourse as deleteCourseFromStore } from "../../../slices/courseSlice";
// import { toast } from "react-hot-toast";

// export default function MyCourses() {
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchMyCourses = async () => {
//       try {
//         const res = await apiConnector(
//           "GET",
//           course.INSTRUCTOR_COURSES_API,
//           null,
//           {
//             Authorization: `Bearer ${token}`,
//           }
//         );
//         setCourses(res.data.data || []);
//       } catch {
//         toast.error("Failed to fetch courses");
//       }
//     };

//     if (token) fetchMyCourses();
//   }, [token]);

//   // 🔴 DELETE COURSE
//   const handleDeleteCourse = async (courseId) => {
//     // if (!window.confirm("Are you sure you want to delete this course?")) return;

//     try {
//       await apiConnector(
//         "DELETE",
//         `${course.DELETE_COURSE_API}/${courseId}`,
//         null,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );

//       // Update UI instantly
//       setCourses((prev) => prev.filter((c) => c._id !== courseId));

//       // Update Redux (optional but good)
//       dispatch(deleteCourseFromStore(courseId));

//       toast.success("Course deleted successfully");
//     } catch {
//       toast.error("Failed to delete course");
//     }
//   };

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-3xl font-bold mb-6">My Courses</h2>

//       {courses.length === 0 ? (
//         <p>No courses created yet</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((c) => (
//             <div key={c._id} className="bg-gray-900 p-4 rounded-xl">
//               <img
//                 src={c.thumbnail}
//                 alt={c.courseName}
//                 className="h-40 w-full object-cover rounded"
//               />
//               <h3 className="mt-2 font-semibold">{c.courseName}</h3>
//               <p className="text-sm text-gray-400">₹ {c.price}</p>

//               <div className="flex items-center gap-2 mt-2 text-gray-400">
//                 <FiUsers />
//                 <span>{c.studentsEnrolled?.length || 0} students</span>
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button className="text-blue-400 flex items-center gap-1">
//                   <FiEdit /> Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteCourse(c._id)}
//                   className="text-red-400 flex items-center gap-1"
//                 >
//                   <FiTrash2 /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiConnector } from "../../../services/apiconnector";
import { course } from "../../../services/apis";
import { FiEdit, FiTrash2, FiUsers } from "react-icons/fi";
import { deleteCourse as deleteCourseFromStore } from "../../../slices/courseSlice";
import { toast } from "react-hot-toast";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyCourses = async () => {
      setLoading(true);
      try {
        const res = await apiConnector(
          "GET",
          course.INSTRUCTOR_COURSES_API,
          null,
          { Authorization: `Bearer ${token}` }
        );
        setCourses(res?.data?.data || []);
      } catch {
        toast.error("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMyCourses();
  }, [token]);

  const handleDeleteCourse = async (courseId) => {
    try {
      await apiConnector(
        "DELETE",
        `${course.DELETE_COURSE_API}/${courseId}`,
        null,
        { Authorization: `Bearer ${token}` }
      );

      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      dispatch(deleteCourseFromStore(courseId));
      toast.success("Course deleted successfully");
    } catch {
      toast.error("Failed to delete course");
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 text-richblack-25">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">My Courses</h2>
        <p className="text-sm text-richblack-400">
          Manage your published and draft courses
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="py-10 text-center text-richblack-400">
          Loading courses...
        </div>
      )}

      {/* EMPTY */}
      {!loading && courses.length === 0 && (
        <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-8 text-center">
          No courses created yet.
        </div>
      )}

      {/* TABLE */}
      {!loading && courses.length > 0 && (
        <div className="overflow-x-auto bg-richblack-800 border border-richblack-700 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-richblack-700 text-richblack-200">
              <tr>
                <th className="px-4 py-3 text-left">Course</th>
                <th className="px-4 py-3 text-left">Students</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((c) => (
                <tr
                  key={c._id}
                  className="border-t border-richblack-700 hover:bg-richblack-700/40 transition"
                >
                  {/* COURSE INFO */}
                  <td className="px-4 py-4">
                    <div className="flex gap-4 items-center">
                      <img
                        src={c.thumbnail}
                        alt={c.courseName}
                        className="h-14 w-20 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {c.courseName}
                        </p>
                        <p className="text-xs text-richblack-400">
                          Created on{" "}
                          {new Date(c.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* STUDENTS */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <FiUsers />
                      {c.studentsEnrolled?.length || 0}
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-4 py-4 text-yellow-400 font-medium">
                    ₹ {c.price}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        c.status === "Published"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {c.status || "Draft"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                        <FiEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(c._id)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-300"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

