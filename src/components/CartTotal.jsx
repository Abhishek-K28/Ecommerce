import React from 'react'
import { useShopContext } from '../context/ShopContext';
import Title from './Title';




const CartTotal = () => {
const {getCartAmount, currency , delivery_fee} = useShopContext();
if(getCartAmount() === 0) { 
    return(
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1="CART" text2="TOTALS"/>
            </div>
            <p className='text-center text-gray-500 mt-4'>Your cart is empty</p>
        </div>
    )
}

  return (
    <div className='w-full'>
        <div className='text-2xl'>
<Title text1="CART" text2="TOTALS"/>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
       <div className='flex justify-between'>
           <p>Subtotal</p>
           <p>{currency} {getCartAmount()}.00</p>
       </div>
       <hr />
  

 
    
<div className='flex justify-between'> 
  <p className=''>Shipping Fee</p>
  <p>{currency} {delivery_fee}</p>
</div>

<hr />

<div className='flex justify-between'>
     <b>Total</b>
     <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount()+delivery_fee}</b>
</div>

        </div>
    </div>
     
  )
}

export default CartTotal