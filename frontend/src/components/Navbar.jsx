import React, { use } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [visible, setVisible] = React.useState(false);
  const { setShowSearch, getCartItemCount ,navigate , token, setToken , setCartItems } = useShopContext();

  const handleLogout = async () => {
  navigate("/login");
   localStorage.removeItem("token");
   setToken(null);
   toast.success("Logged out successfully");
  setCartItems({});
 

  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="LOGO" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collections"
          className="flex flex-col items-center gap-1 "
        >
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1  ">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 ">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />
        <div onClick={() => token ? null : navigate("/login")} className="group relative">  
            {" "}
            <img
              src={assets.profile_icon}
              alt="Profile_Icon"
              className="w-5 cursor-pointer"
            />
        {
          token ?   <div className="group-hover:block hidden absolute dropdown-menu right-0 left-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">
                <Link to="/"> My Profile</Link>
              </p>
              <p  onClick={()=> navigate("/orders")}  className="cursor-pointer hover:text-black">
                {" "}
                 Orders
              </p>
              <p
                onClick={handleLogout}
                className="cursor-pointer hover:text-black"
              >
                {" "}
                <Link> Logout</Link>
              </p>
            </div>
          </div>
          : null}
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="Cart_Icon"
            className="w-5 cursor-pointer"
          />
          <span className="absolute top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {getCartItemCount()}
          </span>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu_Icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* Sidebar menu for small Screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        } `}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="DropDown"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collections"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
