import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../app/features/auth/userAuth";
import { User, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [visibleError, setVisibleError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // Handle temporary error visibility
  useEffect(() => {
    if (error) {
      setVisibleError(error?.message || "Registration failed");
      const timer = setTimeout(() => setVisibleError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120e12] px-4 selection:bg-pink-500/30">
      <div className="w-full max-w-md space-y-8">
        
        {/* Your Original Logo & Branding */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src="/Logo.png" alt="logo" className="h-12 w-12 object-contain" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Resora.</h1>
          <p className="text-gray-400 mt-2 text-sm capitalize tracking-widest opacity-70">
            All Your Music Anytime, anywhere.
          </p>
        </div>

        {/* Animated Error Alert */}
        {visibleError && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm animate-in slide-in-from-top-2">
            <AlertCircle size={18} className="shrink-0" />
            <p className="flex-1">{visibleError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Username */}
          <div className="space-y-1">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-500 transition-colors" size={18} />
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Minimum 3 characters required" }
                })}
                type="text"
                placeholder="Username"
                className={`w-full pl-12 pr-4 py-3.5 bg-[#1a161a] border ${errors.username ? 'border-red-500/50' : 'border-white/5'} rounded-xl text-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none`}
              />
            </div>
            {errors.username && <p className="text-red-400 text-xs ml-1">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-500 transition-colors" size={18} />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
                })}
                type="email"
                placeholder="Email address"
                className={`w-full pl-12 pr-4 py-3.5 bg-[#1a161a] border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded-xl text-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-500 transition-colors" size={18} />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full pl-12 pr-12 py-3.5 bg-[#1a161a] border ${errors.password ? 'border-red-500/50' : 'border-white/5'} rounded-xl text-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 py-4 rounded-xl font-bold text-white shadow-lg shadow-pink-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Creating Account...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 font-semibold hover:text-pink-400 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;