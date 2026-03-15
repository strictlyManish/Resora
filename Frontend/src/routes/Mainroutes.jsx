import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Protected from "../components/Protected";
import Public from "../components/Public";

// Lazy loading pages
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const Music = lazy(() => import("../pages/Music"));

function Mainroutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex-col gap-2 flex items-center justify-center">
          <p className="text-pink-400">Loading...</p>
        </div>
      }
    >
      <Routes>
        {/* Protected route */}
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/feed"
          element={
            <Protected>
              <Music />
            </Protected>
          }
        />

        {/* Public routes */}
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />

        <Route
          path="/register"
          element={
            <Public>
              <Register />
            </Public>
          }
        />

      </Routes>
    </Suspense>
  );
}

export default Mainroutes;
