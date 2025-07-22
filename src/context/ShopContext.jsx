import { createContext, use, useEffect } from "react";
import { products } from "../assets/assets";
import { useContext, useState } from "react";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
};

const ShopContextProvider = ({children}) => {

const currency = "$"
const delivery_fee = 10;
const [search , setsearch] = useState("");
const [showSearch, setShowSearch] = useState(false);
const [cartItem, setCartItem] = useState({});
const navigate = useNavigate();

const addtoCart = async ( itemId , size) => {
 
  if(size === "") {
    toast.error("Please select a size");
    return;
  }

  let cartData = structuredClone(cartItem);
  if(cartData[itemId]) {
    if(cartData[itemId][size]){
    cartData[itemId][size]+= 1;
    }
    else{
      cartData[itemId][size] = 1;
    }
  }
  else{
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }
  setCartItem(cartData);
}


const getCartItemCount = () => {
  let count = 0;
  for (const item in cartItem) {
    for (const size in cartItem[item]) {
     if( cartItem[item][size] > 0) {
        count= count+ cartItem[item][size];
      }

    }
  }

  return count;}

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
   cartData[itemId][size]= quantity;
   setCartItem(cartData);


  }

  const getCartAmount = () => {
let total = 0;
for (const item in cartItem) {
  let itemInfo = products.find((p) => p._id === item);
  for (const size in cartItem[item]) {
    if (cartItem[item][size] > 0) {
      total += itemInfo.price * cartItem[item][size];
    }
  }
}
    return total;
  }

 

const value = {
   products,currency, delivery_fee,search, setsearch, showSearch, setShowSearch,cartItem, setCartItem, addtoCart
  , getCartItemCount,updateQuantity,getCartAmount,navigate
}

return(
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
)

}

export default ShopContextProvider;