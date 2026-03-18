import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div
      className="min-h-screen flex bg-[#120e12] items-center justify-center text-white"
    >
      <div
        className="text-center  bg-white/10 backdrop-blur-md border border-white/20  rounded-2xl p-10 shadow-xl"
      >
        <h1 className="text-6xl font-bold mb-4 text-pink-500">404</h1>

        <p className="text-lg mb-6 opacity-80">Oops! Page not found.</p>

        <Link
          to="/"
          className="px-6 py-2 bg-white/20 hover:bg-white/30 
                     rounded-full transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
