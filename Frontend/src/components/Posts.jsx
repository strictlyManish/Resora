import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMusic } from "../app/features/music/musicSlice";
import { CirclePlay } from "lucide-react";

function Posts() {
  const dispatch = useDispatch();
  const { music, loading, error } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  // Ensure music is always an array to prevent .map() errors
  const musicList = Array.isArray(music) ? music : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {musicList.length > 0 ? (
        musicList.map((song) => (
          <Link
            key={song._id}
            to={`/songs/${song._id}`}
            style={{
              backgroundImage: `url(${song.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full h-44 p-2 rounded-lg relative overflow-hidden"
          >
            <div className="bg-black/50 text-white flex items-center gap-2 absolute bottom-0 left-0 w-full p-2 rounded-b-lg backdrop-blur-2xl">
              <CirclePlay size={20} />
              <p className="truncate font-bold text-xs">{song.title.slice(0, 20)}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No songs available</p>
      )}
    </>
  );
}

export default Posts;
