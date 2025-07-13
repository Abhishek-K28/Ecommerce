import React, { useEffect } from 'react'
import { useShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
const shop = useShopContext()
const [LatestCollection, setLatestCollection] = React.useState([])

useEffect(()=>{
   setLatestCollection(shop.products.slice(0,10))
},[])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
         <Title text1={"LATEST"} text2={"COLLECTION"} />
         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error aliquam cupiditate doloremque similique alias, quis eos!
         </p>
        </div>
 {/*Rendering Latest Collection */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
         {LatestCollection.map((item) => (
            <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
         ))}
        </div>


    </div>
  )
}

export default LatestCollection