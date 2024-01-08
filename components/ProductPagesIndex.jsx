import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./../styles/product_pages_pagination_buttons.css";
import ar7id from "ar7id";
import axios from "axios";
import { serverURL } from "../config/Variables";
const ProductPagesIndex = () => {
  // 1.IT GETS THE TOTAL NUMBER OF PRODUCTS--------------------------------------------------------------------------
  let dispatch = useDispatch();
  let [currentPagesStarts, setCurrentPagesStarts] = useState(1);
  let totalNumberOfProducts = useSelector(
    (state) => state.totalNumberOfProducts
  );
  //2.IT GETS TOTAL NUMBER OF PAGES ACCORDING TO TOTAL PRODUCTS-----------------------------------------------------------------
  let totalPageNumber = Math.ceil(totalNumberOfProducts / 10);
  // 3. MAKES API CALL ACCORDING TO PAGE NUMBER--------------------------------------------------------------------------------------
  let handleApiCall = (number) => {
    axios
      .post(`${serverURL}/api/product/get_products_based_on_index`, {
        indexNumber: number,
      })
      .then((res) => {
        let newProductsData = res.data.productsData;
        // 4. UPDATING PRODUCT DATA ACCORDING TO RECEIVED DATA------------------------------------------------------------
        dispatch({
          type: "UPDATE_PRODUCTS_DATA_FOR_PAGINATION",
          payload: newProductsData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let handleNextPages = () => {
    // 6.HANDLING NEXT PAGES BUTTON FUNCTION-------------------------------------------------------------------------------------
    if (currentPagesStarts + 5 > totalPageNumber) {
      return;
    }
    let newStartingPoint = currentPagesStarts + 5;
    setCurrentPagesStarts(newStartingPoint);
  };
  let handlePreviousPages = () => {
    // 6.HANDLING PREVIOUS PAGES BUTTON FUNCTION-------------------------------------------------------------------------------------

    let newStartingPoint = currentPagesStarts - 5;
    setCurrentPagesStarts(newStartingPoint);
  };
  // 7.MAKING CURRENT PAGES STARTING POINT BACK TO 1 IF IT GETS LOWER THEN 1------------------------------------------------------------------
  if (currentPagesStarts < 1) {
    setCurrentPagesStarts(1);
  }
  return (
    <div className="product_pages_pagination_button_div">
      <div>
        <button onClick={handlePreviousPages}>Previous</button>
        {Array.from({ length: 5 }).map((_, index) => {
          let number = index + currentPagesStarts;
          if (number > totalPageNumber) {
            {
              /* CANCELLING IF THE BUTTONS GETS MORE THAN TOTAL PAGES NUMBER------------------------------------------------------------------------------- */
            }
            return;
          }
          return (
            <button
              key={ar7id()}
              onClick={(e) => {
                handleApiCall(number);
              }}
            >
              {number}
            </button>
          );
        })}
        <button onClick={handleNextPages}>Next</button>
      </div>
    </div>
  );
};

export default ProductPagesIndex;
