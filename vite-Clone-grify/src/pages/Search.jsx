import { useEffect, useState } from "react";
import { GifState } from "../context/context";
import { useParams } from "react-router-dom";
import FilterGif from "../components/filter-gif";
import Gif from "../components/Gif";

const SearchPage = () => {
  const [searchResult, setsearchResult] = useState([]);

  const { gf, filter } = GifState();

  // useParams is used to get dynamic value from URL
  // Example: /search/cat
  // query = "cat"
  const { query } = useParams();

  const fetchSearchResult = async () => {
    try {
      const { data } = await gf.search(query, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 20,
      });

      setSearchResult(data);
    } catch (error) {
      console.log("Error fetching search result:", error);
    }
  };

  useEffect(() => {
    if (gf && query) {
      fetchSearchResult();
    }
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true} />
      {searchResult.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResult.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default SearchPage;