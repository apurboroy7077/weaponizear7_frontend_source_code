import React, { useState } from "react";
import WeaponCard from "./WeaponCard";
import { useSelector } from "react-redux";
import ar7id from "ar7id";

const CardContainer = () => {
  let cartData = useSelector((state) => state.productData);
  let search = useSelector((state) => state.search);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        margin: "1rem",
      }}
    >
      {cartData.map((data) => {
        let name = data.name.toLowerCase();
        let mySearch = search.toLowerCase();
        if (name.includes(mySearch)) {
          return <WeaponCard data={data} key={ar7id()} />;
        }
      })}
    </div>
  );
};

export default CardContainer;
