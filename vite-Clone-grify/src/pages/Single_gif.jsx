import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Context & Components
import { GifState } from "../context/context";
import Gif from "../components/Gif";


// Icons
import { FiArrowDownCircle } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
const CONTENT_TYPES = ["gifs", "stickers", "texts"];

const GifPage = () => {
  // Router & Context 
  const { type, slug } = useParams();
  const { gf, addToFavorites, favorites } = GifState();

  // State
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  //  Data Fetching 
  useEffect(() => {
    if (!CONTENT_TYPES.includes(type)) {
      throw new Error("Invalid Content Type");
    }

    const fetchGif = async () => {
      const gifId = slug.split("-");
      const id = gifId[gifId.length - 1];

      const { data } = await gf.gif(id);
      const { data: related } = await gf.related(id, { limit: 10 });

      setGif(data);
      setRelatedGifs(related);
    };

    fetchGif();
  }, []);

  // ── Handlers ──────────────────────────────────────────
  const getGifUrl = () =>
    gif?.images?.original?.url ||
    gif?.images?.fixed_height?.url ||
    gif?.images?.downsized?.url;

  const shareGif = async () => {
    try {
      const gifUrl = getGifUrl();
      if (!gifUrl) { alert("GIF not found"); return; }

      const blob = await (await fetch(gifUrl)).blob();
      const file = new File([blob], "shared-gif.gif", { type: "image/gif" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: gif?.title || "GIF", text: "Check this GIF!", files: [file] });
      } else {
        await navigator.clipboard.writeText(gifUrl);
        alert("Your browser cannot share actual GIF. GIF URL copied!");
      }
    } catch (error) {
      console.error("Error sharing the GIF:", error);
      alert("Error sharing GIF");
    }
  };

  const downloadGif = async () => {
    try {
      const gifUrl = getGifUrl();
      if (!gifUrl) { alert("GIF not found"); return; }

      const blob = await (await fetch(gifUrl)).blob();
      const url = window.URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), {
        href: url,
        download: `${gif?.title || "download-gif"}.gif`,
      });

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading GIF:", error);
      alert("Could not download GIF");
    }
  };

  return (
    <div className="grid grid-cols-4 my-10 gap-4">

      {/* ── Sidebar ────────────────────────────────── */}
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            {/* User avatar + name */}
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>

            {/* Read more / less description */}
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore
                    ? <>Read less <HiMiniChevronUp size={20} /></>
                    : <>Read more <HiMiniChevronDown size={20} /></>}
                </div>
              </p>
            )}
          </>
        )}

      
        <div className="divider" />

        {/* Source link */}
        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── Main Content ───────────────────────────── */}
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">

          {/* GIF display */}
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* Mobile: user info + share */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          {/* Desktop: action buttons */}
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={favorites.includes(gif.id) ? "text-red-500" : ""}
              />
              Favorite
            </button>

            <button
              onClick={shareGif}
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>

            <button
              onClick={downloadGif}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              <FiArrowDownCircle />
              Download
            </button>
          </div>
        </div>

        {/* ── Related GIFs ───────────────────────── */}
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;