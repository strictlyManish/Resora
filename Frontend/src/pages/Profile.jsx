import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { BoomBox, ChevronLeft, Music, UserRoundPen, UserRoundPlus, LogOut } from "lucide-react";
import { logoutUser } from "../app/features/auth/userAuth";


// Helper component for Stat items to keep code DRY
const StatItem = ({ label, count }) => (
  <div className="flex flex-col items-center">
    <span className="font-bold text-lg leading-none">{count || 0}</span>
    <span className="text-gray-400 text-xs uppercase tracking-wide mt-1">{label}</span>
  </div>
);

function Profile() {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  if (loading) {
    return (
      <div className="min-h-screen bg-[#120e12] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#120e12] flex items-center justify-center text-gray-400">
        No user data found.
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#120e12] text-white flex flex-col max-w-2xl mx-auto shadow-2xl">
      
      {/* Navigation Header */}
      <header className="px-4 py-4 flex items-center gap-4 sticky top-0 bg-[#120e12]/80 backdrop-blur-md z-10">
        <button 
          onClick={() => navigate("/")} 
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold truncate">{user.username}</h1>
      </header>

      <main className="px-6 flex-1">
        {/* Profile Header Section */}
        <section className="flex items-center gap-6 mt-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px] shadow-lg">
              <img
                src={user?.profileImage}
                alt="profile"
                className="w-full h-full rounded-full object-cover bg-[#120e12] p-1"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex justify-around flex-1">
            <StatItem label="posts" count={user?.posts?.length} />
            <StatItem label="followers" count={user?.followers?.length} />
            <StatItem label="following" count={user?.following?.length} />
          </div>
        </section>

        {/* Bio Section */}
        <section className="mt-6">
          <p className="font-bold text-lg">@{user?.username}</p>
          <p className="text-gray-300 text-sm leading-relaxed mt-1 whitespace-pre-wrap">
            {user?.bio || "No bio yet. Tap to edit."}
          </p>
        </section>

        {/* Action Buttons - More efficient flex grid */}
        <section className="grid grid-cols-7 gap-2 mt-6">
          <button onClick={()=>navigate(`/profile/${user._id}`)} className="col-span-3 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all font-semibold py-2.5 rounded-xl">
            Edit
          </button>
          <button className="col-span-3 bg-white/10 hover:bg-white/20 active:scale-95 transition-all font-semibold py-2.5 rounded-xl border border-white/10">
            Message
          </button>
          <button onClick={()=>dispatch(logoutUser())}  className="col-span-1 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-all">
            <LogOut size={18} />
          </button>
        </section>

        {/* Content Tabs */}
        <nav className="mt-10 border-t border-white/10">
          <div className="flex justify-around py-4">
            <Music className="text-pink-500 cursor-pointer" />
            <UserRoundPen className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
            <BoomBox className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
          </div>

          {/* Posts Grid Area */}
          <div className="py-8">
            {user.posts?.length > 0 ? (
              <div className="grid grid-cols-3 gap-1">
                {/* Map your posts here */}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center opacity-40 py-10">
                <Music size={48} strokeWidth={1} />
                <p className="mt-2 font-medium">No posts yet</p>
              </div>
            )}
          </div>
        </nav>
      </main>
    </div>
  );
}

export default Profile;