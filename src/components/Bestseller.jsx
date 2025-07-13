import React, { useEffect } from 'react'
import { useShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const Bestseller = () => {

const {products} = useShopContext();
const [bestsellers, setBestsellers] = React.useState([])

useEffect(() => {
    const bestProducts = products.filter(item => item.bestseller);
    setBestsellers(bestProducts.slice(0,5));
},[])

  return (
   <div className='my-10'>
        <div className='text-center text-3xl py-8'>
         <Title text1={"BEST"} text2={"SELLERS"} />
         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error aliquam cupiditate doloremque similique alias, quis eos!
         </p>
        </div>
 {/*Rendering BestSeller Collection */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
         {bestsellers.map((item) => (
            <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
         ))}
        </div>


    </div>
  )
}

export default Bestseller