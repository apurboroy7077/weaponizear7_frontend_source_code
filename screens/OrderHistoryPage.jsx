import React from "react";
import OrderHistory from "../components/OrderHistory";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";

const OrderHistoryPage = () => {
  return (
    <div style={{ color: "white" }}>
      <header>
        <MyNavbar />
      </header>
      <main style={{ minHeight: "85vh", color: "white" }}>
        <OrderHistory />
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default OrderHistoryPage;
