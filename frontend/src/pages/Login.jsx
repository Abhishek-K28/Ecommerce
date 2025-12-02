import React from 'react'
import { useShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const Login = () => {
const [currentState, setCurrentState] = React.useState("Sign Up");
const { token, setToken, navigate, backenUrl } = useShopContext();
const [name , setName] = React.useState("");
const [email , setEmail] = React.useState("");
const [password , setPassword] = React.useState("");

const onSubmitHandler = async (e) => {
  try{
     e.preventDefault();
  if(currentState === "Login"){
    const res =  await axios.post(`${backenUrl}/api/user/login`, {
      email,
      password
    }, { withCredentials: true });
    if(res.data.success){
       setToken(res.data.token);
       toast.success("Login Successful");
      navigate("/");
    }else{
      toast.error(res.data.message);
    }
  console.log(res)
   
  }else{
    const res =  await axios.post(`${backenUrl}/api/user/register`, {
      name,
      email,
      password
    }, { withCredentials: true });  

    if(res.data.success){
      setToken(res.data.token);
      toast.success("Registration Successful");
      navigate("/");
    }else{
      toast.error(res.data.message);


  }
}

  }catch(err){
    console.log(err);
    toast.error( err.response.data.message);
  }



}




useEffect(() =>{
if(token){
  navigate("/")
}else if(!token && localStorage.getItem("token")){
  setToken( localStorage.getItem("token"));
}

},[token])

  return (
   <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4  text-gray-800'>
   <div className='inline-flex items-center gap-2 mb-2 mt-10'>
       <p className='prata-regular text-3xl'>{currentState}</p>
       <hr  className='border-none h-[1.5px] w-8 bg-gray-800' />
   </div>
   {currentState === "Login" ?"" :
   <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border  border-gray-800 outline-0' placeholder='Name' required />}
    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800 outline-0' placeholder='Email' required />
    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800 outline-0' placeholder='Password' required />
    <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p className='cursor-pointer'>Forgot your password?</p>
      {
        currentState === "Login" ?
        <p onClick={() => setCurrentState("Sign Up")} className='cursor-pointer'>Create an account</p> :
        <p onClick={() => setCurrentState("Login")} className='cursor-pointer'>Already have an account?</p>
      }
    </div>
    <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4' >{currentState === "Login"? "Sign In" : "Sign Up"}</button>
   </form>
  )
}

export default Login