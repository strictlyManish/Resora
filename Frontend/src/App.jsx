import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./app/features/auth/userAuth";
import Mainroutes from "./routes/Mainroutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return <Mainroutes />;
}

export default App;
