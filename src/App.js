import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SigninForm from "./pages/components/SigninForm";
import SignupForm from "./pages/components/SignupForm";
import HomePage from "./pages/Homepage";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      {/* define routes */}
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<HomePage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<SigninForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
