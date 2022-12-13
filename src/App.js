import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Motorcycles from "./pages/Motorcycles";
import AddProduct from "./pages/AddProduct";
import MyReservations from "./pages/MyReservations";
import Reserve from "./pages/Reserve";
import Sidebar from "./components/Sidebar";
import SigninForm from "./components/SigninForm";
import SignupForm from "./components/SignupForm";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      {/* define routes */}
      <BrowserRouter>
        {user ? (
          <Sidebar>
            <Routes>
              <Route path="/" element={<Motorcycles />} />
              <Route path="/reserve" element={<Reserve />} />
              <Route path="/myReservations" element={<MyReservations />} />
              {user.role === 'admin' && <Route path="/addProduct" element={<AddProduct />} />}
            </Routes>
          </Sidebar>
        ) : (
          <Routes>
            <Route path="/" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
