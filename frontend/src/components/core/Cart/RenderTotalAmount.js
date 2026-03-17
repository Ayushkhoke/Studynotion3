import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../Comman/IconBtn';
export default function RendertotalAmount(){
    const{total,cart}=useSelector((state)=>state.cart);
   // Removed buy functionality and total display
   return null;
}