import { GifState } from "../context/context";

const categories = [
  {
    name: "Actions",
    name_encoded: "actions",
    subcategories: [
      {
        name: "breaking up",
        name_encoded: "breaking-up",
      },
      {
        name: "cooking",
        name_encoded: "cooking",
      },
      {
        name: "crying",
        name_encoded: "crying",
      },
      {
        name: "dancing",
        name_encoded: "dancing",
      },
      {
        name: "dreaming",
        name_encoded: "dreaming",
      },
      {
        name: "drinking",
        name_encoded: "drinking",
      },
      {
        name: "eating",
        name_encoded: "eating",
      },
      {
        name: "fainting",
        name_encoded: "fainting",
      },
      {
        name: "falling",
        name_encoded: "falling",
      },
      {
        name: "fighting",
        name_encoded: "fighting",
      },
      {
        name: "finger guns",
        name_encoded: "finger-guns",
      },
      {
        name: "flirting",
        name_encoded: "flirting",
      },
      {
        name: "laughing",
        name_encoded: "laughing",
      },
      {
        name: "pout",
        name_encoded: "pout",
      },
      {
        name: "running",
        name_encoded: "running",
      },
      {
        name: "singing",
        name_encoded: "singing",
      },
      {
        name: "slapping",
        name_encoded: "slapping",
      },
      {
        name: "sleeping",
        name_encoded: "sleeping",
      },
      {
        name: "smiling",
        name_encoded: "smiling",
      },
      {
        name: "smoking",
        name_encoded: "smoking",
      },
      {
        name: "sneezing",
        name_encoded: "sneezing",
      },
      {
        name: "spinning",
        name_encoded: "spinning",
      },
      {
        name: "swimming",
        name_encoded: "swimming",
      },
      {
        name: "tossing drink",
        name_encoded: "tossing-drink",
      },
      {
        name: "waiting",
        name_encoded: "waiting",
      },
    ],
  },
];

const FilterGif = ({ alignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = GifState();

  return (
    <div
      className={`flex flex-wrap gap-3 my-4 ${alignLeft ? "justify-start" : "justify-center"
        }`}
    >
      {showTrending && (
        <button
          onClick={() => setFilter("trending")}
          className="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold"
        >
          Trending
        </button>
      )}

      {categories[0].subcategories.map((item) => (
        <button
          key={item.name_encoded}
          onClick={() => setFilter(item.name_encoded)}
          className={`px-4 py-2 rounded-full capitalize font-semibold transition ${filter === item.name_encoded
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default FilterGif;