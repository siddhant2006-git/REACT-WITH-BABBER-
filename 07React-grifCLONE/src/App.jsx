import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./components/pages/Search";
import SingleGrif from "./components/pages/SingleGrif";
import Category from "./components/pages/category";
import Favorite from "./components/pages/Favorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "search",
        element:<Search/> ,
      },
      {
        path: "singlegrif",
        element: <SingleGrif/>,
      }, {
        path: "/",
        element:<Category/> ,
      }, {
        path: "/",
        element: <Favorite />,
        
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;