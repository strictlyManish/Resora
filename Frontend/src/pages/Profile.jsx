import { useSelector } from "react-redux";
import {BoomBox, ChevronLeft, Music, UserRoundPen, UserRoundPlus} from "lucide-react"

function Profile() {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#120e12] text-white px-4 py-6 flex flex-col">

      <h1 className="flex"> <ChevronLeft /> {user.username}</h1>
      
      {loading ? (
        <p className="text-center mt-10 text-gray-400">Loading Data...</p>
      ) : user ? (
        <div className="w-full max-w-md mt-5 ">
          
          {/* Top Section */}
          <div className="flex items-center gap-4">
            
            {/* Profile Image */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
              <img
                src={
                  user?.profileImage ||
                  "https://picsum.photos/200"
                }
                alt="profile"
                className="w-full h-full rounded-full object-cover bg-[#120e12] p-[2px]"
              />
            </div>

            {/* Stats */}
            <div className="flex justify-between flex-1  ml-2">
              <p>
                <span className="font-semibold block">
                  {user?.posts?.length || 0}
                </span>
                <span className="text-gray-400 text-sm">posts</span>
              </p>

              <p>
                <span className="font-semibold block">
                  {user?.followers?.length || 0}
                </span>
                <span className="text-gray-400 text-sm">followers</span>
              </p>

              <p>
                <span className="font-semibold block">
                  {user?.following?.length || 0}
                </span>
                <span className="text-gray-400 text-sm">following</span>
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4">
            <p className="font-semibold">@{user?.username}</p>
            <p className="text-gray-400 text-sm">
              {user?.bio || "Bio here..."}
            </p>
          </div>

          <div className="flex gap-5 mt-5">
            <button className="bg-pink-500 px-12 py-2 rounded-xl">Follow</button>
            <button className="border px-10 py-2 rounded-xl">Message</button>
            <button className="border rounded-xl p-2 text-center"><UserRoundPlus /></button>
          </div>

            <div className="mt-10">
              <div className="flex justify-around mb-5">
                <Music />
                <UserRoundPen />
                <BoomBox />
              </div>

                <p>{user.posts.length > 0 ? '':<div className="flex flex-col justify-center">
                  
                    <p className="text-gray-600 text-center mt-5">Add some post</p>
                  </div>}</p>

            </div>

        </div>
      ) : (
        <p className="text-center mt-10 text-gray-400">No user data</p>
      )}

      {/* Logout Button */}
      <div className="mt-auto w-full max-w-md mx-auto">
        <button className="w-full bg-gray-800 py-2 rounded-full hover:bg-gray-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;