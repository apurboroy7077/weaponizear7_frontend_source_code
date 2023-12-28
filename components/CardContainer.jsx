import React, { useState } from "react";
import WeaponCard from "./WeaponCard";
import { useSelector } from "react-redux";
import ar7id from "ar7id";

const CardContainer = () => {
  let cartData = useSelector((state) => state.productData);
  let search = useSelector((state) => state.search);

  return (
    <div className="weaponCardContainer">
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
