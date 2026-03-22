import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // fixed import
import { fetchMusic } from "../app/features/music/musicSlice";

function Posts() {
  const dispatch = useDispatch();
  const { music, loading, error } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {music?.length > 0 ? (
        music.map((song) => (
          <Link
            key={song._id}
            to={`/songs/${song._id}`} // added a destination
            style={{
              backgroundImage: `url(${song.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full h-44 p-2 rounded-lg relative"
          >
            <div className="bg-black/60 text-white absolute bottom-0 left-0 w-full p-2 rounded-b-lg backdrop-blur-md">
              <p className="truncate font-bold text-[12px]">{song.title}</p>
              <p className="text-sm opacity-80">{song.artist}</p>
              <span className="text-xs uppercase bg-black px-2 py-1 rounded-full">
                {song.genre}
              </span>
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