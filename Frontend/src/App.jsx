import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./app/features/auth/userAuth";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const hideNavbarRoutes = ["/login", "/register"];

  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/songs/");

  return (
    <>
      {!shouldHideNavbar && user && <Nav />}
      <Mainroutes />
    </>
  );
}

export default App;