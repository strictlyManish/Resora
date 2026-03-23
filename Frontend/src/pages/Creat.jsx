import { useForm } from "react-hook-form";
import { Music, User, Upload, Image, ListMusic } from "lucide-react";

function Create() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // simulate API
      await new Promise((res) => setTimeout(res, 2000));
      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  const coverUrl = watch("cover");

  return (
    <div className="min-h-screen bg-[#120e12] text-white px-4 py-6 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Create Post</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
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
              <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Artist */}
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
              <p className="text-red-400 text-sm mt-1">
                {errors.artist.message}
              </p>
            )}
          </div>

          {/* Audio File */}
          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <Upload size={16} /> Audio File
            </label>
            <input
              type="file"
              accept="audio/*"
              {...register("audio", {
                required: "Audio file is required",
              })}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700"
            />
            {errors.audio && (
              <p className="text-red-400 text-sm mt-1">
                {errors.audio.message}
              </p>
            )}
          </div>

          {/* Cover Image */}
          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <Image size={16} /> Cover Image URL
            </label>

            <input
              type="url"
              {...register("cover", {
                required: "Cover image URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                  message: "Enter a valid image URL",
                },
              })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-lg bg-[#1e1a1e] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            {errors.cover && (
              <p className="text-red-400 text-sm mt-1">
                {errors.cover.message}
              </p>
            )}

            {/* Preview */}
            {coverUrl && !errors.cover && (
              <div className="mt-3">
                <p className="text-xs text-gray-400 mb-1">Preview:</p>
                <img
                  src={coverUrl}
                  alt="Cover Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-700"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>

          {/* Genre */}
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
              <p className="text-red-400 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>

          {/* Submit */}
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
