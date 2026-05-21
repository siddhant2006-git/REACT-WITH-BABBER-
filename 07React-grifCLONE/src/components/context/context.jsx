import { createContext, useContext, useState } from 'react';

import { GiphyFetch } from "@giphy/js-fetch-api";
const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY)


export const GifContext = createContext();


export const GifProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([])
  const [gif, setGif] = useState("")
  const [filter, setFilter] = useState("gifs")
  return (
    <GifContext.Provider value={{ gf, setFilter, setGif, favorite, setFavorite, gif, filter }}>
      {children}
    </GifContext.Provider>
  );
};

export const Gifstate = () => {
  const context = useContext(GifContext);
  if (!context) {
    throw new Error('Gifstate must be used within a GifProvider');
  }
  return context;
};

export default GifContext;