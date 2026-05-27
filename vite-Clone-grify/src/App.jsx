import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favarious from "./pages/Favarious";
import Single_gif from "./pages/Single_gif";
import Categories from "./pages/Categories";
import GifProvider from "./context/context";
import Login from "./pages/login";
import { SignUp } from "@clerk/clerk-react";



function App() {
  // create-browser-Router- it is function of dom which are render(change) the page/ components.
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "../login",
          element: <Login />
        },
        {
          path: "/signup",
          element: <SignUp />
        },
      
        {
          path: "/search/:query",
          element: <Search />,
        },
    
      
        {
          path: "favarious",
          element: <Favarious />,
        },
        {
          path: ":type/:slug",
          element: <Single_gif />,
        },
        {
          path: ":category",
          element: <Categories />,
        },
      ],
    },
  ]);

  // RouterProvider- it is the component of dom which are router connect to router app .

  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
