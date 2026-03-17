// import { useSelector } from "react-redux"
// import RenderCartCourses from './RenderCartCourses'
// import RenderTotalAmount from './RenderTotalAmount'


// export default function Cart(){
//     const [total,totalItems]=useSelector((state)=>state.cart)
//     return(
//         <div>
//             <h1> Your Cart</h1>
//             <p>{totalItems} Courses in Cart</p>
//             {
//                 total>0?(
//                     <div>
//                         <RenderCartCourses/>
//                         <RenderTotalAmount/>
//                     </div>):(<div>
//                         <p>Your  cart is empty</p>
//                         </div>)

//             }
//         </div>
//     )
// }



import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { cart, total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="w-full min-h-screen bg-black px-4 sm:px-8 py-6 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400">Your Cart</h1>
      <p className="mb-4 text-lg text-gray-300">{totalItems} Courses in Cart</p>

      {cart.length > 0 ? (
        <div className="flex flex-col gap-6">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="bg-gray-900/80 rounded-xl p-8 text-center text-gray-400 shadow-lg">
          <p className="text-xl font-semibold mb-2">Your cart is empty</p>
          <p>Add courses to your cart and start learning!</p>
        </div>
      )}
    </div>
  );
}
