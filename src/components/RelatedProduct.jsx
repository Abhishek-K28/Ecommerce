import React, { useEffect } from 'react'
import { useShopContext } from "../context/ShopContext";
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({category , subcategory}) => {
const {products} = useShopContext();
const [relatedProducts, setRelatedProducts] = React.useState([]);

useEffect(() => {   
 if(products.length > 0) {
   let filteredProducts = products.filter((item) => {
     return item.category === category && item.subcategory === subcategory;
   });
   setRelatedProducts(filteredProducts.slice(0, 5)); // Limit to 5 related products
 }

},[])

  return (
    <div className='my-24'>
        <div className=' text-center text-3xl py-2'> 
            <Title text1={"RELATED"} text2={"PRODUCTS"}/>

        </div>
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {relatedProducts.map((item,index) => (
          <ProductItem  key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
          ))}
     </div>
    </div>
  )
}

export default RelatedProduct