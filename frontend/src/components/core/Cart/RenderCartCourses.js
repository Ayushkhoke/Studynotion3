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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {cart.map((course, index) => (
        <div
          key={course._id}
          className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col h-full border border-gray-200 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
        >
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="w-full h-40 rounded-xl object-cover mb-4 border-2 border-yellow-400"
          />
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {course?.courseName}
            </h3>
            <p className="text-base text-gray-700 mb-1">
              {course?.category?.name || "General"}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">In Cart</span>
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">Top Rated</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">Lifetime Access</span>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-400">Instructor:</span>
              <span className="ml-2 text-blue-700 font-medium">{course.instructorName || "Expert Instructor"}</span>
            </div>
            <ul className="mt-2 text-xs text-gray-500 list-disc pl-5">
              <li>Engaging video lectures & quizzes</li>
              <li>Community support & mentorship</li>
              <li>Certificate upon completion</li>
              <li>Money-back Guarantee</li>
              <li>Secure Payment</li>
            </ul>
            <div className="flex items-center mt-3 mb-2">
              <span className="text-xl font-semibold text-blue-700 mr-2">${course?.price}</span>
              <span className="text-sm text-gray-400 line-through">${Math.round(course?.price * 1.5)}</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-xs font-semibold mb-2">
              <span>✔ Trusted by learners in the USA</span>
            </div>
            <p className="text-xs text-gray-400 italic mb-2">Rated 4.9/5 by students</p>
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition mt-3 font-semibold bg-red-100 px-3 py-2 rounded"
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

