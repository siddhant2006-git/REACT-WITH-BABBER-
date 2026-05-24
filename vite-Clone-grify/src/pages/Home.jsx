import { useEffect } from "react";
import { GifState } from "../context/context";

function Home() {
  const { gf, filter, setGif,gifs } = GifState();

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

  useEffect(() => {
    if (gf) {
      fetchTrendingGif();
    }
  }, [filter]);

  return (
    <div className="pt-4">
      <img
        src="/banner.gif"
        alt="banner"
        className="mt-2 rounded-lg w-full"
      />
      {/* <filterGif/> */}
      <div>
        <gifs/>
      </div>
    </div>
  );
}

export default Home;