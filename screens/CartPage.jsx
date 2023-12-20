import React from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import Cart from "../components/Cart";

const CartPage = () => {
  return (
    <div className="cartpage">
      <header>
        <MyNavbar />
      </header>
      <main style={{ minHeight: "85vh" }}>
        <Cart />
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default CartPage;
