import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../app/features/auth/userAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      }),
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120e12] px-4">
      {/* Card */}
      <div className="w-full max-w-md  p-8 text-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/Logo.png" alt="logo" className="h-14 object-contain" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2">Log in</h1>

        <p className="text-gray-400 text-center text-sm mb-8">
          Log in and start managing your candidates
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* email */}
          <div>
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "email is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-[#230b29] border border-[#17464F] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-[#230b29] border border-[#17464F] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold text-black transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have a Resora account yet?{" "}
          <a
            href="/register"
            className="text-pink-400 hover:text-pink-300 font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
