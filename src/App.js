import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Signup from "./pages/Signup";
import { logout } from "./redux/users/user_reducer";
import Signin from "./pages/Signin";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="App">
      <Signup />
      { user !== {} ? <button onClick={() => dispatch(logout())}>Logout</button> : null }
      <Signin />
    </div>
  );
}

export default App;
