import axios from "axios";
import React, { useEffect } from "react";
import { serverURL } from "../config/Variables";
import { useDispatch, useSelector } from "react-redux";
import ar7id from "ar7id";
import WeaponCard2 from "./WeaponCard2";

const CardContainer2 = () => {
  let dispatch = useDispatch();
  let productsDataFromServer = useSelector(
    (state) => state.productsDataFromServer
  );
  useEffect(() => {
    axios
      .post(`${serverURL}/api/product/get_products_selled_by_user`)
      .then((res) => {
        let productsData = res.data.productsData;
        dispatch({
          type: "UPDATE_PRODUCTS_DATA_FROM_SERVER",
          payload: productsData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="weapon_card_2_container">
      {productsDataFromServer.map((product) => {
        return <WeaponCard2 key={ar7id()} product={product} />;
      })}
    </div>
  );
};

export default CardContainer2;
