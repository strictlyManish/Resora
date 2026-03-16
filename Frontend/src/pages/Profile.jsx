import { useSelector } from "react-redux";

function Profile() {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#120e12] text-white p-10 flex flex-col">
      {loading ? (
        "Loading Data..."
      ) : user ? (
        <div>
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px]">
              <img
                src={
                  user.profileImage ||
                  "https://picsum.photos/seed/picsum/200/300"
                }
                alt=""
                className="w-full h-full rounded-full object-cover bg-[#120e12] p-2"
              />
            </div>
            <div className="flex gap-2">
              <p className="text-white">
                {user.followers.length}
                <br/>
                <span className="capitalize text-gray-400">followers</span>
              </p>
              <p className="text-white">{user.following.length}
                <br/>
                <span className="capitalize text-gray-400">following</span>
              </p>
            </div>
          </div>
            <div className="mt-5">
              <div className="dets">
                <p>{user.username}</p>
              </div>
            </div>
        </div>
      ) : (
        "No user data"
      )}

      {/* Push button to bottom */}
      <div className="mt-auto flex justify-end">
        <button className="bg-gray-800 px-8 py-2 rounded-full hover:bg-gray-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
