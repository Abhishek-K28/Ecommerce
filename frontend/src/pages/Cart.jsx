import React, { useEffect } from "react";
import { useShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItem, currency, updateQuantity, navigate , getCartAmount } = useShopContext();
  const [cartData, setCartData] = React.useState([]);
  useEffect(() => {
    
    const tempData = [];
    for (const item in cartItem) {
      for (const size in cartItem[item]) {
        if (cartItem[item][size] > 0) {
          tempData.push({
            _id: item,
            size: size,
            quantity: cartItem[item][size],
          });
        }
      }
    }
    setCartData(tempData);
  
  }, [cartItem]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item,index) => {
          const productData = products.find((p) => p._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b border-gray-300 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* First grid column: Image + Name + Price */}
              <div className="flex items-start gap-6">
                {/* Product Image */}
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={productData?.image[0]}
                  alt={productData?.name}
                />

                {/* Name and Price stacked vertically */}
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData?.name} ({item?.size})
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      {currency}
                      {productData?.price}
                    </p>
                    <p className="px-2 sm:px-3 bg-slate-50 border">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => {
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      );
                }}
                className="border- max-w-10 sm:max-w-20 sm:px-2 py-1 px-1"
                type="number"
                min={1}
                defaultValue={item?.quantity}
                name=""
                id=""
              />
              <img
                onClick={() => {
                  updateQuantity(item._id, item.size, 0);
                }}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
       <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px] ">
       <CartTotal/>
       { getCartAmount() > 0 && (
          <div className="w-full text-end">
             <button onClick={() => navigate("/place-order")} className="bg-black text-white text-sm my-8 px-8 py-3 active:bg-gray-700">PROCEED TO CHECKOUT</button>
           </div>
        )}
        </div>
       </div>

    </div>
  );
};

export default Cart;
