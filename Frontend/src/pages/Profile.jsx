import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BoomBox,
  ChevronLeft,
  Music,
  UserRoundPen,
  LogOut,
  Plus
} from "lucide-react";
import { logoutUser } from "../app/features/auth/userAuth";
import Posts from "../components/Posts";

const StatItem = ({ label, count }) => (
  <div className="flex flex-col items-center">
    <span className="font-bold text-lg leading-none">{count || 0}</span>
    <span className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
      {label}
    </span>
  </div>
);

function Profile() {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120e12] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#120e12] flex items-center justify-center text-gray-400 px-6 text-center">
        <p>No user data found. Please log in again.</p>
      </div>
    );
  }

  const profileImage = user?.profileImage?.trim() ? user.profileImage : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white max-w-2xl mx-auto border-x border-white/5 shadow-2xl">
      
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold tracking-tight">
            {user.username}
          </h1>
        </div>
        <button
          onClick={() => dispatch(logoutUser())}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
        </button>
      </header>

      <main>
        {/* Profile Info Section */}
        <section className="px-6 pt-4 pb-6">
          <div className="flex items-center gap-8">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 p-[3px] shadow-2xl shadow-pink-500/20">
                <div className="w-full p-1 h-full rounded-full bg-[#120e12] overflow-hidden flex items-center justify-center">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <UserRoundPen size={32} className="text-gray-600" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between flex-1 px-2">
              <StatItem label="posts" count={user?.posts?.length} />
              <StatItem label="followers" count={user?.followers?.length} />
              <StatItem label="following" count={user?.following?.length} />
            </div>
          </div>

          <div className="mt-5 px-1">
            <p className="font-bold text-base">@{user?.username}</p>
            <p className="text-gray-400 text-sm mt-1 leading-relaxed italic">
              {user?.bio || "Edit profile to add a bio..."}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => navigate(`/profile/${user._id}`)}
              className="flex-1 bg-white text-black hover:bg-gray-200 active:scale-95 transition-all font-bold py-2.5 rounded-lg text-sm"
            >
              Edit Profile
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 active:scale-95 transition-all font-bold py-2.5 rounded-lg border border-white/5 text-sm">
              Share Profile
            </button>
          </div>
        </section>

        {/* Tabs and Grid */}
        <section className="mt-2 border-t border-white/5">
          <div className="flex justify-around border-b border-white/5">
            <button className="flex-1 py-3 flex justify-center border-b-2 border-pink-500">
              <Music className="text-pink-500" size={20} />
            </button>
            <button className="flex-1 py-3 flex justify-center text-gray-500 hover:text-white transition-colors">
              <BoomBox size={20} />
            </button>
          </div>

          <div className="min-h-[300px] bg-black/20">
            {user?.posts?.length > 0 ? (
              <div className="w-full">
                {/* IMPORTANT: The 'Posts' component already has its own grid. 
                  Don't wrap it in another grid or it will look tiny.
                */}
                <Posts userId={user._id} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center mb-4">
                   <Plus className="text-gray-600" />
                </div>
                <p className="text-gray-500 font-medium">No tracks uploaded yet</p>
                <button 
                  onClick={() => navigate('/upload')}
                  className="mt-4 text-pink-500 font-bold text-sm hover:underline"
                >
                  Upload your first song
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;