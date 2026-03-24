import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMusic } from "../app/features/music/musicSlice";
import { Loader, Sparkles } from "lucide-react";

const FILTERS = [
  { label: <Sparkles />, color: "bg-blue-500" },
  { label: "Party", color: "bg-pink-600" },
  { label: "Bhakti", color: "bg-pink-600" },
  { label: "Pop", color: "bg-pink-600" },
  { label: "New", color: "bg-pink-600" },
];

function Home() {
  const dispatch = useDispatch();
  const {
    musicList: music,
    loading,
    error,
  } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  if (loading)
    return (
      <main className="min-h-screen bg-[#120e12] flex items-center justify-center">
        <Loader color="pink" />
      </main>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!music || music.length === 0) return <p>No music found.</p>;

  return (
    <div className="max-h-screen h-screen bg-[#120e12] text-white px-4 py-3 overflow-y-auto">
      <h1 className="text-3xl w-[60vw] font-bold mb-4 select-none">
        Your Favorite <span className="text-pink-500">Stream</span>
      </h1>

      <div className="flex overflow-auto justify-center items-center gap-3 mb-6 capitalize">
        {FILTERS.map(({ label, color }) => (
          <p
            key={label}
            className={`${color} px-3 py-1 rounded-full backdrop-blur-3xl cursor-pointer select-none hover:brightness-110 transition`}
            role="button"
            tabIndex={0}
            aria-label={`Filter by ${label}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") e.preventDefault();
            }}
          >
            {label}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {music.map((song) => (
          <Link
            to={`/songs/${song._id}`}
            key={song._id}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform"
            aria-label={`View details for ${song.title}`}
          >
            <img
              src={song.coverImage}
              alt={`Cover art for ${song.title}`}
              className="w-full h-48 object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 backdrop-blur-md">
              <p className="truncate font-semibold text-sm">{song.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
