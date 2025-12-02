import React, { useEffect } from 'react'
import { useShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const VerifyPayment = () => {

  const {navigate , token , setCartItem , backenUrl} = useShopContext()
  const [searchParams , setSearchParams] = useSearchParams()

  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  
  const PaymentVerify = async() => {
      try{
        if(!token){
          return null
        }
        const response = await axios.post(backenUrl+"/api/order/verifyStripe" , {success , orderId} , {headers: {Authorization: `Bearer ${token}`}})
          if(response.data.success){
            setCartItem({})
            navigate("/orders")
          }else{
            navigate("/cart")
          }
      }catch(err){
          console.log(err);
          toast.error(err.message)
      }

  }

  useEffect(() => {
    PaymentVerify()
  },[token])

  return (
    <div>
     verify
    </div>
  )
}

export default VerifyPayment