import axios from "axios";
import React, { useEffect } from "react";
import { serverURL } from "../config/Variables";

const CardContainer2 = () => {
  useEffect(() => {
    axios
      .post(
        `${serverURL}/api/product/get_total_number_of_products_selled_by_users`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div>CardContainer2</div>;
};

export default CardContainer2;
