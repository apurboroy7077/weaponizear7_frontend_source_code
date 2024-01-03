import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { myStore } from "./config/ReduxConfiguration";
import Loginpage from "./screens/Loginpage";
import SignupPage from "./screens/SignupPage";
import CartPage from "./screens/CartPage";
import AdminPage from "./screens/AdminPage";
import "./main.css";
import LogoutPage from "./screens/LogoutPage";
import "react-toastify/dist/ReactToastify.css";
import OrderHistoryPage from "./screens/OrderHistoryPage";
import Banned from "./screens/Banned";
import UploadProductPage from "./screens/UploadProductPage";
import ProductDetailsPage from "./screens/ProductDetailsPage";
import WishlistPage from "./screens/WishlistPage";
const Main = () => {
  useEffect(() => {
    document.title = "WeaponizeAR7";
  }, []);
  return (
    <Provider store={myStore}>
      <div
        style={{
          backgroundColor: "#1c1c1c",
          minHeight: "100vh",
          Width: "100%",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminpanel" element={<AdminPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/orderhistory" element={<OrderHistoryPage />} />
            <Route path="/banned" element={<Banned />} />
            <Route path="/uploadproduct" element={<UploadProductPage />} />
            <Route path="/product_details" element={<ProductDetailsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default Main;
