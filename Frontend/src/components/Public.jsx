import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Loader} from "lucide-react"


function Public() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#120e12] text-pink-500 flex flex-col items-center justify-center">
        <Loader color="pink" size={20} className="animate-spin"  />
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