import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Protected from "../components/Protected";
import Public from "../components/Public";
import Accounts from "../pages/Accounts";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const Home = lazy(() => import("../pages/Home"));

function Mainroutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#120e12] flex flex-col items-center justify-center">
          <p className="text-pink-500">Loading page...</p>
        </div>
      }
    >
      <Routes>

        {/* Public routes (only for NOT logged in users) */}
        <Route element={<Public />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<Accounts/>} />
        </Route>

        {/* Protected routes */}
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default Mainroutes;