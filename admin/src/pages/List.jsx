import React, { useEffect } from 'react'
import axios from 'axios';
import { backenUrl, currency } from '../Body';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

const List = () => {

  const {token} = useOutletContext();
const [list , setList] = React.useState([]);
const fetchList = async()=>{
   try{ 
    const res = await axios.get(backenUrl+"/api/product/list",{  headers: {
      Authorization: `Bearer ${token}`
    }, withCredentials:true});
   if(res.data.success){
    setList(res.data.products);
   }else{
    toast.error(res.data.message)
   }
}
catch(e){
console.log(e);
toast.error(e.message)
}
}

const removeProduct = async(id)=>{ 
  try{
  const res =  await axios.post(backenUrl+"/api/product/remove",{id},{withCredentials:true});
    if(res.data.success){
      toast.success(res.data.message);
      await fetchList();
    }else{
      toast.error(res.data.message)
    }

  }catch(e){
    console.log(e);
    toast.error(e.message)
  }
 }

useEffect(()=>{
  fetchList();
},[])


  return (
    <>
    <p className='mb-2'>All Products List</p>
    <div className='flex flex-col gap-2'>

     {/* List Items  Title*/}

      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2  bg-gray-100 text-sm '>
        <b>Image</b>
       <b>Name</b>
       <b>Category</b>
       <b>Price</b>
       <b className='text-center'>Action</b>
      </div>
      {/* List Items */}
    {list.length === 0?
    <div className='w-full h-[70vh] flex items-center justify-center'> <p className='text-3xl text-pink-300'>You did not list  any item yet</p></div>
   :    list.map((item , index) => (
        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-white text-sm' key={index}>
           <img className='w-12 ' src={item.image[0]} alt="" />
           <p>{item.name}</p>
           <p>{item.category}</p>
           <p>{currency}{item.price}</p>
           <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg hover:text-red-400'>X</p>
           
        </div>
      ))
    }


    </div>
    
    </>
  )
}

export default List