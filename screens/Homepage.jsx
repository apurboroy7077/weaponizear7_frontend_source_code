import React, { useEffect } from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import CardContainer from "../components/CardContainer";
import MyCarousel from "../components/MyCarousel";
import CenterMode from "../components/ReactSlick";

const Homepage = () => {
  return (
    <div className="homepage">
      <header>
        <MyNavbar />
      </header>
      <main style={{ minHeight: "100vh" }}>
        <MyCarousel />
        <CardContainer />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CenterMode />
        </div>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default Homepage;
