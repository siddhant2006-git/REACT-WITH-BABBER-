import  { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [filter, setFilter] = useState("gifs");
  const [favorite, setFavorite] = useState([]);
  const [gif, setGif] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_API_KEY);
  console.log(gf);

  return (
    <GifContext.Provider
      value={{
        gf,
        gif,
        setGif,
        favorite,
        setFavorite,
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