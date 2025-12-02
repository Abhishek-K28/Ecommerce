import React from "react";
import { Routes, Route } from "react-router-dom";
import VerifyPayment from "./pages/VerifyPayment"
import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <ToastContainer />
      <Navbar />
      <Searchbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Order />} />
        <Route path="*" element={<div>404 nd</div>} />
        <Route path="/verify" element={<VerifyPayment/>} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
