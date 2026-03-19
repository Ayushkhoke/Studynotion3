// import React from 'react'
// import ProgressBar from "@ramonak/react-progress-bar";
// import { useSelector } from 'react-redux';
// import {useState,useEffect} from 'react'
// import { getEnrolledCourses } from '../../../services/profileAPI';
// export default function EnrolledCourses(){

//     const {token}=useSelector((state)=>state.auth);
//     const[enrolledCourses,setEnrolledCourse]=useState([]);
//     const loadEnrolledCourses =async()=>{
//         try{
//      const res=await getEnrolledCourses(token);
//     setEnrolledCourse(res);

//         }
//         catch(error){
//             console.log(" unable to fetch the Enrolled courses ");
//         }
//     }
//     useEffect(()=>{
// loadEnrolledCourses();
//     },[])
// return(
//     <div>
//         <div>
//             Enrolled Courses
//             {
//                 !enrolledCourses?(<div>
//                     Loading...
//                     </div>)
//                     :(<div>{!enrolledCourses.length ? <p>You have not enrolled in any courses yet</p>
//                     :(
//                         <div>
//                             <div>
//                                 <p>Course Name</p>
//                                 <p>Duration</p>
//                                 <p>Progress</p>
//                                 </div>
//                                 {/* card shuru hote hai ab */}
//                                 {
//                                     enrolledCourses.map((course,index)=>(
//                                         <div key={index}>
//                                             <div>
//                                                 <img src={course.thumbnail}/>
//                                                 <div>
//                                                     <p>{course.courseName}</p>
//                                                      <p>{course.courseDescription}</p>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     {course?.totalDuration}
//                                                     </div>
//                                                     <div>
//                                                         <p>Progress :{course.progressPercentage || 0}</p>
//                                                         <ProgressBar
//                                                         completed={course.progressPercentage ||0} 
//                                                         height="8px"
//                                                         isLabelVisible={false}/>
                                                        
//                                                         </div>
//                                             </div>
//                                     ))
//                                 }
//                             </div>
//                     )
//                 }</div>)
//             }
//         </div>

//     </div>
// )

// }


// import React, { useEffect, useState } from "react";
// import ProgressBar from "@ramonak/react-progress-bar";
// import { useSelector } from "react-redux";
// import { getEnrolledCourses } from "../../../services/profileAPI";

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth);
//   const [enrolledCourses, setEnrolledCourses] = useState(null);

//   const loadEnrolledCourses = async () => {
//     try {
//       const res = await getEnrolledCourses(token);
//       setEnrolledCourses(res);
//     } catch (error) {
//       console.log("Unable to fetch enrolled courses");
//       setEnrolledCourses([]);
//     }
//   };

//   useEffect(() => {
//     if (token) loadEnrolledCourses();
//   }, [token]);

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>

//       {enrolledCourses === null && <p>Loading...</p>}

//       {enrolledCourses !== null && enrolledCourses.length === 0 && (
//         <p>You have not enrolled in any courses yet</p>
//       )}

//       {enrolledCourses?.map((course) => (
//         <div key={course._id} className="mb-6 bg-gray-900 p-4 rounded-xl">
//           <div className="flex gap-4">
//             <img
//               src={course.thumbnail}
//               alt={course.courseName}
//               className="w-40 h-24 rounded-lg object-cover"
//             />
//             <div className="flex-1">
//               <p className="text-lg font-semibold">{course.courseName}</p>
//               <p className="text-sm text-gray-400">
//                 {course.courseDescription}
//               </p>

//               <div className="mt-3">
//                 <p>Progress: {course.progressPercentage || 0}%</p>
//                 <ProgressBar
//                   completed={course.progressPercentage || 0}
//                   height="8px"
//                   isLabelVisible={false}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import ProgressBar from "@ramonak/react-progress-bar";
// import { useSelector } from "react-redux";
// import { getEnrolledCourses } from "../../../services/profileAPI";

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth);
//   const [enrolledCourses, setEnrolledCourse] = useState(null);

//   const loadEnrolledCourses = async () => {
//     try {
//       const res = await getEnrolledCourses(token);
//       setEnrolledCourse(res); // res is guaranteed to be an array
//     } catch (error) {
//       console.log("Unable to fetch enrolled courses");
//       setEnrolledCourse([]);
//     }
//   };

//   useEffect(() => {
//     loadEnrolledCourses();
//   }, [token]);

//   return (
//     <div>
//       <h2>Enrolled Courses</h2>

//       {!enrolledCourses ? (
//         <div>Loading...</div>
//       ) : !enrolledCourses.length ? (
//         <p>You have not enrolled in any courses yet</p>
//       ) : (
//         <div>
//           <div style={{ display: "flex", fontWeight: "bold", marginBottom: "10px" }}>
//             <p style={{ flex: 2 }}>Course Name</p>
//             <p style={{ flex: 1 }}>Duration</p>
//             <p style={{ flex: 1 }}>Progress</p>
//           </div>

//           {enrolledCourses.map((course, index) => (
//             <div key={index} style={{ display: "flex", marginBottom: "15px", alignItems: "center" }}>
//               <img src={course.thumbnail} alt={course.courseName} width={100} style={{ marginRight: "10px" }} />
//               <div style={{ flex: 2 }}>
//                 <p>{course.courseName}</p>
//                 <p>{course.courseDescription}</p>
//               </div>
//               <div style={{ flex: 1 }}>{course.totalDuration}</div>
//               <div style={{ flex: 1 }}>
//                 <p>Progress: {course.progressPercentage || 0}%</p>
//                 <ProgressBar completed={course.progressPercentage || 0} height="8px" isLabelVisible={false} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEnrolledCourses } from "../../../services/profileAPI";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();

  const loadEnrolledCourses = async () => {
    try {
      const res = await getEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Unable to fetch enrolled courses");
      setEnrolledCourses([]);
    }
  };

  useEffect(() => {
    if (token) {
      loadEnrolledCourses();
    }
  }, [token]);

  return (
      <div className="p-4 text-white max-w-full">
        <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>

        {/* Loading */}
        {enrolledCourses === null && <p>Loading...</p>}

        {/* No courses */}
        {enrolledCourses !== null && enrolledCourses.length === 0 && (
          <p>You have not enrolled in any courses yet</p>
        )}

        {/* Course cards */}
        <div className="flex flex-col gap-4">
          {enrolledCourses?.map((course) => (
            <div
              key={course._id}
              className="bg-gray-900 p-3 rounded-xl cursor-pointer hover:bg-gray-800 transition flex flex-col sm:flex-row items-center sm:items-start gap-3 shadow-md"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full sm:w-40 h-24 rounded-lg object-cover mb-2 sm:mb-0"
              />
              <div className="flex-1 w-full">
                <p className="text-base sm:text-lg font-semibold truncate">{course.courseName}</p>
                <p className="text-xs sm:text-sm text-gray-400 truncate mb-2">{course.courseDescription}</p>
                <div className="mt-2">
                  <p className="text-xs sm:text-sm mb-1">Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
