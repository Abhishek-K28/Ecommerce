import React, { use } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";

export const backenUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$"

const Body = () => {
  const [token, setToken] = React.useState(localStorage.getItem("token")?localStorage.getItem("token"):null);

  useEffect(() => {
    localStorage.setItem("token", token);
  },[token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Outlet context={{token}} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
