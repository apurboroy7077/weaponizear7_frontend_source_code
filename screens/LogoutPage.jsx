import React from "react";
import MyNavbar from "../components/MyNavbar";
import Logout from "../components/Logout";
import MyFooter from "../components/MyFooter";

const LogoutPage = () => {
  return (
    <div>
      <header>
        <MyNavbar />
      </header>
      <main>
        <Logout />
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default LogoutPage;
