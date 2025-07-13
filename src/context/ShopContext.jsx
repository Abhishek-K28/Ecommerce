import { createContext } from "react";
import { products } from "../assets/assets";
import { useContext, useState } from "react";

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

const value = {
   products,currency, delivery_fee,search, setsearch, showSearch, setShowSearch
}

return(
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
)

}

export default ShopContextProvider;