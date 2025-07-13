import React from 'react'
import { useShopContext } from '../context/ShopContext'



const Product = () => {
const {products} = useShopContext()


  return (
    <div>products</div>
  )
}

export default Product