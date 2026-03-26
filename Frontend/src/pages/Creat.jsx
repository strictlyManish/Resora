import { useForm } from "react-hook-form";
import { Music, User, Upload, Image, ListMusic, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../app/features/music/musicSlice";
import { useNavigate } from "react-router-dom";

function Create() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false);
  const {loading,error} = useSelector((state)=>state.music);


  const onSubmit = (data) => {
    dispatch(CreatePost(data));
    navigate("/")
  };

  const coverUrl = watch("coverImage");


  if(loading){
    return  <main className="min-h-screen bg-[#120e12] flex items-center justify-center">
        <UploadIcon color="pink" />
      </main>
  }

  if(error){
    return <main className="min-h-screen bg-[#120e12] flex items-center justify-center">
        <p className="text-pink-500 animate-pulse">Uplod again.</p>
      </main>
  }

  return (
    <div className="min-h-screen bg-[#120e12] text-white px-4 py-6 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Create Post</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <Music size={16} /> Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Enter title"
              className="w-full px-4 py-2 rounded-lg bg-[#1e1a1e] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <User size={16} /> Artist
            </label>
            <input
              {...register("artist", { required: "Artist name is required" })}
              placeholder="Artist name"
              className="w-full px-4 py-2 rounded-lg bg-[#1e1a1e] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            {errors.artist && (
              <p className="text-red-400 text-sm mt-1">{errors.artist.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <Upload size={16} /> Audio File
            </label>
            <input
              type="file"
              accept="audio/*"
              {...register("audioUrl", {
                required: "Audio file is required",
              })}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700"
            />
            {errors.audioUrl && (
              <p className="text-red-400 text-sm mt-1">
                {errors.audioUrl.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <Image size={16} /> Cover Image URL
            </label>

            <input
              type="url"
              {...register("coverImage", {
                required: "Cover image URL is required",
              })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2 rounded-lg bg-[#1e1a1e] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              onChange={() => setImgError(false)}
            />

            {errors.coverImage && (
              <p className="text-red-400 text-sm mt-1">
                {errors.coverImage.message}
              </p>
            )}

            {coverUrl && !imgError && (
              <div className="mt-3">
                <p className="text-xs text-gray-400 mb-1">Preview:</p>
                <img
                  src={coverUrl}
                  alt="Cover Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-700"
                  onError={() => setImgError(true)}
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <ListMusic size={16} /> Genre
            </label>
            <select
              {...register("genre", { required: "Select a genre" })}
              className="w-fit px-4 py-2 rounded-lg bg-[#1e1a1e] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="">Select Genre</option>
              <option value="pop">Pop</option>
              <option value="party">Party</option>
              <option value="hiphop">Hip-Hop</option>
              <option value="lofi">Lofi</option>
              <option value="bollywood">Bollywood</option>
              <option value="bhakti">Bhakti</option>
              <option value="rock">Rock</option>
              <option value="other">Other</option>
            </select>

            {errors.genre && (
              <p className="text-red-400 text-sm mt-1">{errors.genre.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50 transition-all py-3 rounded-lg font-semibold"
          >
            {isSubmitting ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;