import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../app/features/auth/userAuth";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const Login = () => {
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

  useEffect(() => {
    if (error) {
      setVisibleError(error?.message || "Login failed");
      const timer = setTimeout(() => setVisibleError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const onSubmit = (data) => dispatch(loginUser(data));

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120e12] px-4 selection:bg-pink-500/30">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr  mb-4">
            <img
              src="/Logo.png"
              alt="logo"
              className="h-12 w-12 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Login.</h1>
          <p className="text-gray-400 mt-2">
            Enter your details to access your account
          </p>
        </div>

        {visibleError && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm animate-in slide-in-from-top-2 duration-300">
            <AlertCircle size={18} className="shrink-0" />
            <p className="flex-1">{visibleError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-500 transition-colors"
                size={18}
              />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-3.5 bg-[#1a161a] border border-white/5 rounded-xl text-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-500 transition-colors"
                size={18}
              />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: 4,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3.5 bg-[#1a161a] border border-white/5 rounded-xl text-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-500/50 py-4 rounded-xl font-bold text-white shadow-lg shadow-pink-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In"
            )}
            {!loading && <ChevronRight size={18} />}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-500 font-semibold">
            Join Resora
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
