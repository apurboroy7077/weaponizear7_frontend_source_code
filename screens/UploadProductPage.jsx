import React from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import UploadProduct from "../components/UploadProduct";

const UploadProductPage = () => {
  return (
    <div>
      <header>
        <MyNavbar />
      </header>
      <main style={{ minHeight: "85vh" }}>
        <UploadProduct />
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default UploadProductPage;
