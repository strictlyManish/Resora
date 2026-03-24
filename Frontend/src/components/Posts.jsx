import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMusic } from "../app/features/music/musicSlice";
import { Link } from "react-router-dom";
import { CirclePlay } from "lucide-react";

function Posts() {
  const dispatch = useDispatch();
  
  // Destructuring musicList and aliasing it as 'music'
  const { musicList: music = [], error, loading } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  if (loading) return <p className="text-center p-10 font-medium">Loading hits...</p>;
  if (error) return <p className="text-red-500 text-center p-10">Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {music.length > 0 ? (
        music.map((song) => (
          <Link
            key={song._id}
            to={`/songs/${song._id}`}
            style={{ backgroundImage: `url(${song.coverImage})` }}
            // CHANGED: w-20 to w-full so it fills the grid column properly
            className="group w-full h-52 rounded-xl relative bg-cover bg-center overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl shadow-black/50"
          >
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            
            <div className="absolute bottom-0 w-full p-3 flex items-center gap-2 backdrop-blur-md bg-white/10 border-t border-white/10">
              <CirclePlay size={22} className="shrink-0 text-white fill-white/20" />
              <div className="overflow-hidden">
                <p className="truncate font-bold text-[11px] uppercase tracking-wide text-white">
                  {song.title}
                </p>
                <p className="truncate text-[10px] text-gray-300 font-medium">
                  {song.artist}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="col-span-full text-center py-20 opacity-50 italic">
          No music found in the library.
        </p>
      )}
    </div>
  );
}

export default Posts;