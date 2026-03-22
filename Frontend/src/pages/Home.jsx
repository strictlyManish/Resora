import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { music, loading, error } = useSelector((state) => state.music);

  if (loading) return <p className="text-pink-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!music || music.length === 0) return <p>No music found.</p>;

  return (
    <div className="h-screen bg-[#120e12] text-white px-4 py-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Music Library</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {music.map((song) => (
          <Link
            to={`/plays/${song.id}`}
            key={song.id}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={song.coverImage}
              alt={song.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2">
              <p className="text-white font-semibold">{song.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;