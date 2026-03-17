// import React from 'react'
// import { useSelector } from 'react-redux'
// import { RiStarSFill } from "react-icons/ri";
// import { RiStarSLine } from "react-icons/ri";
// import { MdDelete } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import ReactStars from "react-rating-stars-component";
//  // or your ReactStars path

// export default function RenderCartCourses(){
//     const{cart,removeFromCart}=useSelector((state)=>state.cart);
//     const dispatch=useDispatch();
//     return(
//         <div>
//             {
//                 cart.map((course,index)=>(
//                     <div key={index}>
//                         <div>
//                             <img src={course?.thumbnail}/>
//                             <div>
//                                 <p>{course?.courseName}</p>
//                                   <p>{course?.category?.name}</p>
//                             <div>

//                                 <span>4.8</span>
//                                 <ReactStars
//                                 count={5}
//                                 size={20}
//                                 edit={false}
//                                 activeColor='#ffd700'
//                                 emptyIcon={<RiStarSLine />}
//                                 fullIcon={<RiStarSFill />}/>
//                                 <span>{course?.ratingAndReview?.length}Ratings</span>
//                                 </div>
//                             </div>
//                        </div>


//                        <div>
//                         <button onClick={()=>dispatch(removeFromCart(course._id))}>
//                      <MdDelete />
//                      <span>Remove</span>
//                         </button>
//                         <p>Rs {course?.price}</p>
                       
//                         </div>
//                         </div>
//                 ))
//             }
//         </div>
//     )
// }

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../slices/cartSlice";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-6">
      {cart.map((course, index) => (
        <div
          key={course._id}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
        >
          {/* Index */}
          <span className="hidden sm:block text-gray-500 font-bold text-xl">
            {index + 1}
          </span>

          {/* Thumbnail */}
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="w-full sm:w-48 h-48 sm:h-32 rounded-xl object-cover border-2 border-yellow-400"
          />

          {/* Course Info */}
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-yellow-300">
              {course?.courseName}
            </h3>
            <p className="text-base text-gray-200 mt-1">
              {course?.category?.name || "General"}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">In Cart</span>
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">Top Rated</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">Lifetime Access</span>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-400">Instructor:</span>
              <span className="ml-2 text-white font-medium">{course.instructorName || "Expert Instructor"}</span>
            </div>
            <ul className="mt-2 text-xs text-gray-400 list-disc pl-5">
              <li>Engaging video lectures and quizzes</li>
              <li>Community support and mentorship</li>
              <li>Certificate upon completion</li>
            </ul>
            <p className="text-yellow-400 font-bold text-xl mt-3">
              ₹ {course?.price}
            </p>
            <p className="text-sm text-gray-300 mt-1">Ready to checkout and start learning!</p>
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition mt-3 font-semibold"
            >
              <MdDelete size={20} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

