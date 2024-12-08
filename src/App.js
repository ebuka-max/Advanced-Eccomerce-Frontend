import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";
import AdminOnlyRoute from "./components/hiddenLink/AdminOnlyRoute";
import NotFound from "./pages/404/NotFound";
import Product from "./pages/shop/Product";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderDetails from "./pages/order/OrderDetails";
import OrderHistory from "./pages/order/OrderHistory";


const App = () => {
  axios.defaults.withCredentials = true;
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch])

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser())
    }
  }, [dispatch, isLoggedIn, user])

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Product />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} /> 

          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />

          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout-stripe" element={<Checkout />} />

          <Route path="/admin/*" element={
            <AdminOnlyRoute><Admin /></AdminOnlyRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
