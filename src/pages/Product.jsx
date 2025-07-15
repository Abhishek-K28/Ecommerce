import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";


const Product = () => {
  const { products , currency , addtoCart} = useShopContext();
  const { productId } = useParams();
  const [productData, setProductData] = useState("");
  const [Image, setImage] = useState("");
  const [size , setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
 
  

  useEffect(() => {
    fetchProductData();
  }, [productId, productData]);

  return productData ? (
  <div className="border-t-2 pt-10 transition-opacity  ease-in duration-500 opacity-100">
   
   <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

 {/*  Product images*/}
 <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
    <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between  sm:justify-normal sm:w-[18.7%] w-full">
     {
      productData.image.map((item , index)=> (
           <img  onClick={() => {setImage(item)}} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer py-1 sm:py-0" alt="" />
      ))
     }
    </div>
    <div className="w-full sm:w-[80%]">
      <img src={Image} alt="" className="w-full h-auto" />
    </div>

 </div>
 
  {/*--------------- Product details ------------------------*/}
  <div className="flex-1 ">
  <h1 className="font-medium text-2xl mt-2 ">
    {productData.name}
  </h1>
  <div className="flex items-center gap-1 mt-2">
   <img src={assets.star_icon} alt="" className="w-3" />
   <img src={assets.star_icon} alt="" className="w-3" />
   <img src={assets.star_icon} alt="" className="w-3" />
   <img src={assets.star_icon} alt="" className="w-3" />
   <img src={assets.star_dull_icon} alt="" className="w-3" />
   <p className="pl-2">(122)</p>
  </div>
  <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
  <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

  {/* Sizes Buttons */}
  <div className="flex flex-col gap-4 my-8">
    <p>Select Size</p>
    <div className="flex gap-2">
      {productData.sizes.map((item, index) => (
        <div onClick={() => setSize(item)}
          key={index}
          className={`border border-gray-300 px-3 py-1 cursor-pointer hover:bg-gray-100 ${item === size ? "border-orange-500" :  ""}`}
        >
          {item}
        </div>
      ))} 
    </div>

  </div>

  {/* ------------------Cart Buttons---------------------- */}
  <button  onClick={() => {addtoCart(productData._id , size)}} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
  <hr className="mt-8 sm:4/5" />

  {/*----------------Product Return available or delivery Details--------------- */}
  <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
    <p>100% Original product</p>
    <p> Cash on delivery available on this product</p>
    <p>Easy return and exchange policy within 7 days</p>
  </div>
  </div>
   </div>


   {/*------------Description and Review section */}
   <div className="mt-20">
    <div className="flex">
  <b className="border px-5 py-3 text-sm">Description</b>
  <p className="border px-5 py-3 text-sm ml-0.5">Reviews (122)</p>
    </div>
    <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 mt-0.5">
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque sit amet nobis unde harum minus animi laudantium atque corrupti sed voluptates esse quo architecto vitae expedita veniam itaque, recusandae sapiente nisi delectus. Voluptatum laboriosam reprehenderit explicabo temporibus tempora veritatis ab.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptate deserunt neque eveniet ipsa minima, consequuntur sit voluptates temporibus molestiae tenetur, voluptatum tempore dicta sed facere. Dolore obcaecati incidunt alias, cumque, quod veritatis delectus dolorum possimus, ducimus et illum qui quaerat id voluptas? Tenetur sunt sint, perspiciatis voluptates recusandae sapiente?</p>
    </div>
   </div>

   {/*------------------Display related product--------------------- */}
   <RelatedProduct category={productData.category } subcategory={productData.subcategory}/>

  </div>



  ) : <div className="opacity-0" > </div>
}

export default Product;
