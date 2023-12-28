import React from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import Wishlist from "../components/Wishlist";

const WishlistPage = () => {
  return (
    <div>
      <header>
        <MyNavbar />
      </header>
      <main>
        <Wishlist />
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default WishlistPage;
