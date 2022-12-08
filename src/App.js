import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { logout } from "./redux/users/user_reducer";
import SigninForm from "./pages/components/SigninForm";
import SignupForm from "./pages/components/SignupForm";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="App">
      <SignupForm />
      { user !== {} ? <button className="btn btn-danger " onClick={() => dispatch(logout())}>Logout</button> : null }
      <SigninForm />
    </div>
  );
}

export default App;
