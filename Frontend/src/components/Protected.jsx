import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const { user, loading } = useSelector((state) => state.auth);

  // ✅ While checking auth (important for cookie-based auth)
  if (loading) {
    return (
      <main className="min-h-screen bg-[#120e12] flex items-center justify-center">
        <Loader color="pink" />
      </main>
    );
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return <Outlet />;
}

export default Protected;
