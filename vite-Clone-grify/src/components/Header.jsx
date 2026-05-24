/* eslint-disable react-hooks/static-components */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { GifState } from "../context/context";

function Header() {
  const [category, setCategory] = useState([]);
  const [showCategory, setShowCategory] = useState(true);

  const { gf } = GifState();

  useEffect(() => {
    const fetchGifCategory = async () => {
      try {
        const { data } = await gf.categories();
        // console.log("Category data:", data);

        // JSon.stringify the data to see the structure of text clearly in the console
        const textData = JSON.stringify(data);
        console.log("Category text data:", textData);
        
        setCategory(data);
      } catch (error) {
        console.log("Category fetch error:", error);

      }
    };

    if (gf) {
      fetchGifCategory();
    }
  }, [gf]);

  const CategoryList = () => {
    if (!Array.isArray(category)) {
      return (
        <div className="text-sm text-red-300">
          Invalid category payload: {JSON.stringify(category)}
        </div>
      );
    }

    if (category.length === 0) {
      return (
        <div className="text-sm text-slate-300">Loading categories...</div>
      );
    }

    return (
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {category.map((item) => {
          const key = item.name_encoded || item.name;
          const imageUrl = item.gif?.images?.preview_gif?.url;

          return (
            <Link
              key={key}
              to={`/search/${encodeURIComponent(item.name_encoded || item.name)}`}
              className="block rounded-xl overflow-hidden bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="h-32 w-full object-cover"
                />
              ) : (
                <div className="h-32 w-full bg-slate-700 flex items-center justify-center text-slate-300">
                  {item.name}
                </div>
              )}
              <div className="p-3">
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="text-xs text-slate-400">{item.subcategories?.length ?? 0} subcategories</div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-4 px-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <p className="text-sm text-slate-400">Browse GIF categories from Giphy.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCategory((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 hover:border-slate-400"
        >
          <HiMenuAlt2 className="h-4 w-4" />
          {showCategory ? "Hide" : "Show"}
        </button>
      </div>

      {showCategory && <CategoryList />}
    </section>
  );
}

export default Header;
