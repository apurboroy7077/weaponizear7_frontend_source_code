import React from "react";
import MyNavbar from "../components/MyNavbar";
import Loginform from "../components/LoginForm";
import MyFooter from "../components/MyFooter";

const Loginpage = () => {
  return (
    <div className="loginpage">
      <header>
        <MyNavbar />
      </header>
      <main style={{ minHeight: "85vh" }}>
        <div
          style={{
            margin: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loginform />
        </div>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default Loginpage;
