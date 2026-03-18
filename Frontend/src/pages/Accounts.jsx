import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 

import { 
  ChevronLeft, 
  Camera, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2 
} from "lucide-react";

import { updateProfile } from "../app/features/update/userProfile"; 

function Accounts() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { user } = useSelector((state) => state.auth); 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(user?.profileImage || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      bio: user?.bio || "", 
    }
  });

  const profileImage = watch("profileImage");

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ REAL SUBMIT (UI untouched)
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const file = data.profileImage?.[0];

    const resultAction = await dispatch(
      updateProfile({
        id: user._id,
        bio: data.bio,
        file,
      })
    );

    setIsSubmitting(false);

    if (updateProfile.fulfilled.match(resultAction)) {
      navigate("/profile"); // ✅ redirect after success
    } else {
      alert(resultAction.payload || "Update failed");
    }
  };

  return (
    <div className="bg-[#120e12] text-white min-h-screen flex flex-col max-w-2xl mx-auto shadow-2xl">
      
      {/* Header */}
      <header className="px-4 py-4 flex items-center gap-4 sticky top-0 bg-[#120e12]/80 backdrop-blur-md z-20 border-b border-white/5">
        <button 
          onClick={() => navigate("/profile")} 
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-lg font-bold tracking-tight">Account Center</h1>
      </header>

      <main className="flex-1 px-6 py-8">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Profile Picture Section */}
          <section className="flex flex-col items-center">
            <div className="relative group">
              <div className={`w-32 h-32 rounded-full bg-white/5 border-2 border-dashed flex items-center justify-center overflow-hidden transition-all 
                ${errors.profileImage ? 'border-red-500' : 'border-white/20 group-hover:border-pink-500/50'}`}>
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera size={32} className="text-gray-500" />
                )}
              </div>
              <label className="absolute bottom-1 right-1 bg-pink-600 p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform active:scale-95">
                <Camera size={18} />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  {...register("profileImage", {
                    onChange: handleImagePreview,
                    validate: {
                      lessThan2MB: (files) => !files[0] || files[0].size < 2000000 || "Max size 2MB",
                      acceptedFormats: (files) => 
                        !files[0] || ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type) || "Only JPEG, PNG or WebP"
                    }
                  })}
                />
              </label>
            </div>
            {errors.profileImage && (
              <p className="mt-2 text-xs text-red-400 font-medium">{errors.profileImage.message}</p>
            )}
            {!errors.profileImage && <p className="mt-3 text-xs text-gray-400">Tap the camera to change photo</p>}
          </section>

          {/* Bio Section */}
          <section className="space-y-2">
            <div className="flex justify-between items-end ml-1">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Bio</label>
              <span className={`text-[10px] ${watch("bio")?.length > 150 ? 'text-red-400' : 'text-gray-500'}`}>
                {watch("bio")?.length || 0}/150
              </span>
            </div>
            <textarea
              {...register("bio", { 
                required: "Bio cannot be empty",
                maxLength: { value: 150, message: "Bio must be under 150 characters" }
              })}
              placeholder="Tell the world your story..."
              className={`w-full bg-white/5 border rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 transition-all min-h-[120px] resize-none 
                ${errors.bio ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-pink-500/50 focus:border-pink-500'}`}
            />
            {errors.bio && <p className="text-xs text-red-400 font-medium ml-1">{errors.bio.message}</p>}
          </section>

          {/* Update Button */}
          <button 
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <CheckCircle2 size={20} />
            )}
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>

          <hr className="border-white/5" />

          {/* Danger Zone (unchanged) */}
          <section className="pt-4">
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <AlertTriangle size={20} />
                <h2 className="font-bold uppercase tracking-widest text-xs">Danger Zone</h2>
              </div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Deleting your account is permanent. This will remove all your data from our servers instantly.
              </p>
              <button 
                type="button"
                className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}

export default Accounts;