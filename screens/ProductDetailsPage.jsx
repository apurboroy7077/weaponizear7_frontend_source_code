import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyNavbar from "../components/MyNavbar";
import ProductDetails from "../components/ProductDetails";
import MyFooter from "../components/MyFooter";

const ProductDetailsPage = () => {
  return (
    <div className="product_details_page">
      <header>
        <MyNavbar />
      </header>
      <main>
        <ProductDetails />
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default ProductDetailsPage;
