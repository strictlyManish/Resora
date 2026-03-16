import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => { // ✅ renamed
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120e12] px-4">

      <div className="w-full max-w-md p-8 text-white">

        <div className="flex justify-center mb-6">
          <img src="/Logo.png" alt="logo" className="h-14 object-contain" />
        </div>

        <h1 className="text-4xl font-bold text-center mb-2">Resora.</h1>
        <p className="text-gray-400 text-center text-sm mb-8">
          All Your Music Anytime, anywhere.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required"
                }
              })}
              className="w-full px-4 py-3 rounded-lg bg-[#120e12] border border-[#17464F] text-white"
            />

            {errors.username && (
              <p className="text-red-400 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email" // ✅ fixed
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required"
                }
              })}
              className="w-full px-4 py-3 rounded-lg bg-[#120e12] border border-[#17464F] text-white"
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
                  message: "Password must be at least 4 characters"
                }
              })}
              className="w-full px-4 py-3 rounded-lg bg-[#120e12] border border-[#17464F] text-white"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold text-black"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-400 hover:text-pink-300 font-medium"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;