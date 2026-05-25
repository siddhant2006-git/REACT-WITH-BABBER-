import { useEffect } from "react";
import { GifState } from "../context/context";
import FilterGif from "../components/filter-gif";
import Gif from "../components/gifs";

function Home() {
  const { gf, filter, setGif, gif } = GifState();

  useEffect(() => {
    const fetchTrendingGif = async () => {
      try {
        const { data } = await gf.trending({
          limit: 20,
          offset: 0,
          rating: "g",
        });

        setGif(data);
      } catch (error) {
        console.log("Error fetching trending gifs:", error);
      }
    };

    if (gf) {
      fetchTrendingGif();
    }
  }, [gf, filter, setGif]);

  return (
    <div className="pt-4">
      <img
        src="/banner.gif"
        alt="banner"
        className="mt-2 rounded-lg w-full"
      />
      <FilterGif showTrending />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {gif.length > 0 ? (
          gif.map((item) => <Gif gif={item} key={item.id} />)
        ) : (
          <p className="text-center text-gray-300">Loading gifs...</p>
        )}
      </div>
    </div>
  );
}

export default Home;