import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./app/features/auth/userAuth";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";

function App() {
  const dispatch = useDispatch();
  const {user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return <>
  {user ? <Nav/>:''}
  <Mainroutes />
  </>;
}

export default App;
