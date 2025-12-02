import React, { useEffect } from "react";
import { useShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collections = () => {
  const { products , search , showSearch } = useShopContext();
  const [showFilters, setShowFilters] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = React.useState([]);
 

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategory((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((category) => category !== value);
      }
    });

  }

  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSubCategory((prev) => {
        if(checked){
          return [...prev , value];
        }else{
          return prev.filter((subcategory) => subcategory !== value);
        }

    })

  
  }

  const applyFilters = () => {
    let filtered = products;
    if(showSearch && search){
      filtered = filtered.filter((item) => { return item.name.toLowerCase().includes(search.toLowerCase())})
      
    }
  
    if (selectedCategory.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedCategory.includes(product.category);
        
      }
    
    
    )}

    if( selectedSubCategory.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedSubCategory.includes(product.subcategory);
      })}

    setFilteredProducts(filtered);
    
    }


   const sortProducts = (sortType) => {
    let sortedProducts = [...filteredProducts];
      switch(sortType) {
        case "low-high": 
        setFilteredProducts(sortedProducts.sort((a, b) => a.price - b.price));
        break;

        case "high-low":
        setFilteredProducts(sortedProducts.sort((a, b) => b.price - a.price));  
        break;

        default:
        applyFilters();
        break;
      }
  
  }



useEffect(() => {
applyFilters();
},[selectedCategory,selectedSubCategory , search , showSearch , products])




  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => {
            setShowFilters(!showFilters);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
          />
        </p>
        {/* CATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 " value={"Men"} onChange={handleCategoryChange} />
              Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 " value={"Women"} onChange={handleCategoryChange} />
              Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 " value={"Kids"} onChange={handleCategoryChange} />
              Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-6 ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 " value={"Topwear"} onChange={handleSubCategoryChange} />
              Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 " value={"Bottomwear"} onChange={handleSubCategoryChange} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3 " value={"Winterwear"} onChange={handleSubCategoryChange} />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>
          {/* Product Sort */}
          <select onChange={(e) => sortProducts(e.target.value)} className="border-2 border-gray-300 text-sm px-2" name="" id="">
            <option value="relevent">Sort by: Relavent</option>
            <option value="low-high" >Sort by: Low to High</option>
            <option value="high-low" >Sort by: High to Low</option>
          </select>

        </div>
     {/* Map Products  */}

     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
     {
       filteredProducts.map((items , index) => (
        <ProductItem key={index} name={items.name} id={items._id} price={items.price} image={items.image}  />
       ))
      
     }

     </div>

      </div>


    </div>
  );
};

export default Collections;
