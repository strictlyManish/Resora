import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#120e12] flex items-center justify-center">
        <Loader color="pink" size={20} className="animate-spin"  />
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default Protected;
