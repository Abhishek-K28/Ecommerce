import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {



const [method, setMethod] = React.useState("cod");
const { navigate , backenUrl , token , cartItem , setCartItem, getCartAmount , delivery_fee , products } = useShopContext();
const [formData , setFormData] = React.useState({
   firstName: "",
   lastName: "",
   email: " ",
   street: " ",
   city: "",
   state : "",
   zipcode: "",
   country: "",
   phone: "",
})

const onChangeHandler = (event) => {
   const name = event.target.name;
   const value = event.target.value;

   setFormData(data =>  {return {...data, [name]:value}})
   setFormData({...formData , [name] : value})
}

const onSubmitHandler = async (e) => {
   try{
     e.preventDefault();
     let orderItems  = [];
     for(const items in cartItem){
      for(const item in cartItem[items]){
         if(cartItem[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
               itemInfo.size = item
               itemInfo.quantity = cartItem[items][item] 
               orderItems.push(itemInfo)
            }
         }
      }

     }
     
     let orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee
     }

     switch(method){
      case "cod" : 
       const response = await axios.post(backenUrl+"/api/order/place" , orderData , {headers: {Authorization : `Bearer ${token}`}});
       if(response.data.success){
         setCartItem({})
         navigate("/orders")
       }else{
         toast.error(response.data.message)
       } 
      break;

      case "stripe" :
      const resStripe = await axios.post(backenUrl+"/api/order/stripe" ,orderData , {headers: {Authorization: `Bearer ${token}`}})
      if(resStripe.data.success){
      const {session_url} = resStripe.data
      window.location.replace(session_url)
      }else{
         toast.error(resStripe.data.message)
      }
      break;
      
      case "razorpay" :
    const resRazorpay = await axios.post(backenUrl+"/api/order/razorpay" ,orderData , {headers: {Authorization: `Bearer ${token}`}})
    if(resRazorpay.data.success){
      console.log(resRazorpay.data.order)
    }
      break;


      default:
         break;
     }
   

    


   }catch(e){
         console.log(e);
         toast.error(e.message);
   }
}

const initPay = (order) => {
    const options ={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description:  "prder Payment",
      order_id: order.id,
      reciept: order.reciept,
      handler: async(response) => {
         console.log(response);
      }
    }

    const rzp = new window.Razorpay(options);
      rzp.open();
      
}



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1="DELIVERY" text2="INFORMATION" />
           <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData?.firstName || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-4 placeholder:text-lg outline-0' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData?.lastName || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-4 placeholder:text-lg outline-0' type="text" placeholder='Last name' />
           </div>
          <input required onChange={onChangeHandler} name='email' value={formData?.email || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-4 placeholder:text-lg outline-0' type="text" placeholder='Email address' />
           <input required onChange={onChangeHandler} name='street' value={formData?.street || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-4 placeholder:text-lg outline-0' type="text" placeholder='Street' />
        </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='city' value={formData?.city || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-4 placeholder:text-lg outline-0' type="text" placeholder='City' />
           <input required onChange={onChangeHandler} name='state' value={formData?.state || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-4 placeholder:text-lg outline-0' type="text" placeholder='State' /> 
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='zipcode' value={formData?.zipcode || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-1 outline-0' type="text" placeholder='Zipcode' />
           <input required onChange={onChangeHandler} name='country' value={formData?.country || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-1 outline-0' type="text" placeholder='Country' /> 
          </div>
           <input  required onChange={onChangeHandler} name='phone' value={formData?.phone || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mb-1 outline-0' type="number" placeholder='Phone' /> 
      </div>
{/* ------------------------Right side---------------------------------- */}
       <div className='mt-8'>
            <div className='mt-8 min-w-80'>
        <CartTotal/>
            </div>
        <div className='mt-12 text-xl'>
           <Title text1="PAYMENT" text2="METHOD" />
           {/* Payment method options can be added here */}
           <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 border p-2 cursor-pointer px-3'>
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""} `}></p>
               <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod("razorpay")}className='flex items-center gap-3 border p-2 cursor-pointer px-3'>
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
               <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod("cod")} className='flex items-center gap-3 border p-2 cursor-pointer px-3'>
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}> </p>
               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
            </div>
       <div className='w-full text-end mt-8'>
          <button type='submit'  className='bg-black text-white text-sm px-8 py-3 active:bg-gray-700'>PLACE ORDER</button>
       </div>
            
        </div>

       </div>
    </form>
  )
}

export default PlaceOrder