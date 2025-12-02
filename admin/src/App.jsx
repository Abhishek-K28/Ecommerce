import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Body";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

const App = () => {
  const approute = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/list",
          element: <List />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={approute} />;
};

export default App;
