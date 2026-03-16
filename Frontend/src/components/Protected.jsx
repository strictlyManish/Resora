import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#120e12] flex flex-col items-center justify-center">
        <p className="text-pink-500">Authenticating..</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
} 

export default Protected;