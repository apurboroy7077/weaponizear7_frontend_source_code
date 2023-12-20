import React from "react";
import MyNavbar from "../components/MyNavbar";
import Loginform from "../components/LoginForm";
import MyFooter from "../components/MyFooter";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
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
          <SignupForm />
        </div>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default SignupPage;
