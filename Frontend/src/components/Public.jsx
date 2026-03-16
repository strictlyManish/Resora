import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function Public() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <p>Checking authentication...</p>
      </main>
    );
  }

  // 🔥 If user already logged in → redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default Public;