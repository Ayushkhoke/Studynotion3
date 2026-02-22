// import React from 'react'
// import IconBtn from './IconBtn'

// export default function ConfirmationModel({modelData}){
//     return(
//         <div>
//             <div>
//                 <p>{modelData.text1}</p>
//                 <p>{modelData.text2}</p>
//             </div>
//             <div>
//                 <IconBtn onclick={modelData?.btnHandler} text={modelData?.btnText}/>
//             <button onClick={modelData?.btnHandler}>
//                 {modelData?.btn1text}
//          {modelData?.btn2text}
//             </button>
//             </div>
//         </div>
//     )
// }


// import React from "react";
// import IconBtn from "./IconBtn";

// export default function ConfirmationModel({ modalData }) {
//   if (!modalData) return null; // ✅ prevents crash

//   return (
//     <div className="bg-black  w-[350px] h-[300px] flex flex-col justify-center items-center z-50">
//       <div>
//         <p>{modalData.text1}</p>
//         <p>{modalData.text2}</p>
//       </div>

//       <div className=" flex gap-[10px]">
//         <IconBtn
//           onClick={modalData?.btn1Handler}
//           text={modalData?.btn1Text} 
      
//         />

//         <button onClick={modalData?.btn2Handler} className="hover:bg-yellow-500 hover:text-black">
//           {modalData?.btn2Text}
          
//         </button>
//       </div>
//     </div>
//   );
// }


import React from "react";
import IconBtn from "./IconBtn";

export default function ConfirmationModel({ modalData }) {
  if (!modalData) return null;

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-richblack-800 border border-richblack-700 rounded-2xl p-6 shadow-2xl">

          {/* TEXT */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-richblack-25">
              {modalData.text1}
            </h2>
            <p className="mt-2 text-sm text-richblack-400">
              {modalData.text2}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-center gap-4">
            <IconBtn
              onClick={modalData?.btn1Handler}
              text={modalData?.btn1Text}
              className="bg-red-500 text-white hover:bg-red-400"
            />

            <button
              onClick={modalData?.btn2Handler}
              className="px-4 py-2 rounded-md bg-richblack-700 text-richblack-25
              hover:bg-richblack-600 transition"
            >
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
