import  { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

// useContext-multicomponents me share karna ka context . 
// createcontext-data ko gobal box create ma karta hai.
const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);
  const [gif, setGif] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_API_KEY);
  
// include -this function is use to check the value present or string or array me present or not.
  const addToFavorites = (gifId) => {
    if (favorites.includes(gifId)) {
      setFavorites(favorites.filter((id) => id !== gifId));
    } else {
      setFavorites([...favorites, gifId]);
    }
  };

  return (
    <GifContext.Provider
      value={{
        gf,
        gif,
        setGif,
        favorites,
        setFavorites,
        addToFavorites,
        filter,
        setFilter,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;