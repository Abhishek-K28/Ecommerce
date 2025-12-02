import { createContext, useEffect } from "react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
};

const ShopContextProvider = ({ children }) => {

  

  const currency = "$";
  const backenUrl = import.meta.env.VITE_BACKEND_URL;
  const delivery_fee = 10;
  const [search, setsearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState( localStorage.getItem("token") ? localStorage.getItem("token") : null);

  const addtoCart = async (itemId, size) => {
    if (size === "") {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    
    setCartItem(cartData);
    if(token){
      try{
        await axios.post(backenUrl+ '/api/cart/add' , {itemId , size} , {headers:{  Authorization: `Bearer ${token}`}})

      }catch(e){
          console.log(e)
          toast.error(e.message) 
      }
    }
  };

  const getCartItemCount = () => {
    let count = 0;
    for (const item in cartItem) {
      for (const size in cartItem[item]) {
        if (cartItem[item][size] > 0) {
          count = count + cartItem[item][size];
        }
      }
    }

    return count;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    if(token){
      try{
          await axios.post(backenUrl+"/api/cart/update" ,{itemId, size, quantity} , {headers: {Authorization : `Bearer ${token}`}})
      }catch(e){
            console.log(e)
          toast.error(e.message) 
      }
    }
  };

  const getCartAmount = () => {
    let total = 0;
    for (const item in cartItem) {
      let itemInfo = products.find((p) => p._id === item);
      for (const size in cartItem[item]) {
        if (cartItem[item][size] > 0) {
          total += itemInfo?.price * cartItem[item][size];
        }
      }
    }
    return total;
  };

  const getProductData = async () => {
    try {
      const res = await axios.get(backenUrl + "/api/product/all", {
        withCredentials: true,
      });
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const getUserCart = async () => {
    try{
      const res = await axios.post(backenUrl+"/api/cart/get" ,{}, {headers: {Authorization : `Bearer ${token}`}})
      if(res.data.success){
        setCartItem(res.data.cartData)
      }

    }catch(e){
        console.log(e);
      toast.error(e.message);
    }
  }

  useEffect(() => {
    getProductData();
   
  }, []);

  useEffect(() => {
    if(token){
    localStorage.setItem("token", token);
    }

  },[token])

  useEffect(() => {
  if (token) {
    getUserCart();
  }
}, [token]);
   

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setsearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addtoCart,
    getCartItemCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backenUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
