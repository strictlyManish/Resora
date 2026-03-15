import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/auth/userAuth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Top Header */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-800 bg-gray-900">
        <h1 className="text-xl font-bold">Profile</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {/* Profile Container */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-3xl bg-gray-900 rounded-2xl shadow-xl p-8">

          {/* Profile Header */}
          <div className="flex items-center gap-6 border-b border-gray-700 pb-6">
            <img
              src={user.profileImage || "https://i.pravatar.cc/150?img=12"}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
            />

            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>

              <span className="mt-2 inline-block text-sm bg-indigo-600 px-3 py-1 rounded-full">
                {user.role}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around text-center mt-6">
            <div>
              <h3 className="text-xl font-semibold">
                {user.followers?.length || 0}
              </h3>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                {user.following?.length || 0}
              </h3>
              <p className="text-gray-400 text-sm">Following</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                {new Date(user.createdAt).getFullYear()}
              </h3>
              <p className="text-gray-400 text-sm">Joined</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Username</p>
              <p className="text-lg font-medium">{user.username}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Role</p>
              <p className="text-lg font-medium capitalize">{user.role}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Account Created</p>
              <p className="text-lg font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;