import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../app/features/auth/userAuth";

function Protected({ children }) {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return (
      <main className="min-h-screen flex-col gap-2 flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;