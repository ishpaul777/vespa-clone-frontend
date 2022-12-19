/* eslint-disable no-nested-ternary */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllProducts from './pages/AllProducts';
import AddProduct from './pages/AddProduct';
import MyReservations from './pages/MyReservations';
import ProductDetails from './pages/ProductDetails';
import Reserve from './pages/Reserve';
import Sidebar from './components/Sidebar';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import LoadingPage from './pages/LoadingPage';
import Page404 from './pages/Page404';

function App() {
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);

  return (
    <div className="App">
      {/* define routes */}
      <BrowserRouter>
        {loading ? (
          <LoadingPage />
        ) : user ? (
          <Sidebar>
            <Routes>
              <Route path="/" element={<AllProducts />} />
              <Route
                path="/products"
                element={<AllProducts />}
              />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route
                path="/reserve"
                element={<Reserve />}
              />
              <Route path="/myReservations" element={<MyReservations />} />
              {user.role === 'admin' && (
                <Route path="/addProduct" element={<AddProduct />} />
              )}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Sidebar>
        ) : (
          <Routes>
            <Route path="/" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
