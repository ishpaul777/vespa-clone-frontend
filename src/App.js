/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/users/user_reducer';
import { getAllReservedProducts } from './redux/reservations/reservations_reducer';
import { getProducts } from './redux/products/products_reducer';
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
  const dispatch = useDispatch();
  const productdata = useSelector((state) => state.products);
  const reservationData = useSelector((state) => state.reservations);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllReservedProducts());
  }, [dispatch]);

  function checkAuth() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = fetch('http://localhost:3000/current_user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response.ok;
  }

  // when the window is reload, check if the auth token is still valid
  // if not, logout the user
  if (user) {
    if (checkAuth() === false) {
      dispatch(logout());
    }
  }

  return (
    <div className="App">
      {/* define routes */}
      <BrowserRouter>
        {loading ? (
          <LoadingPage />
        ) : user ? (
          <Sidebar>
            <Routes>
              <Route path="/" element={<AllProducts data={productdata} />} />
              <Route
                path="/products"
                element={<AllProducts data={productdata} />}
              />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route
                path="/reserve"
                element={<Reserve />}
              />
              <Route path="/myReservations" element={<MyReservations data={reservationData} />} />
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
