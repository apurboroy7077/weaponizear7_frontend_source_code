import React from "react";
import "./../styles/weapon_card_2.css";
import { useDispatch, useSelector } from "react-redux";
const WeaponCard2 = (props) => {
  let cartData = useSelector((state) => state.cartData);
  let { description, email, imageURL, name, price } = props.product;
  let dispatch = useDispatch();
  let handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: props.product,
    });
  };
  let doesExistInCart = false;
  let thisItemInCart = cartData.filter((data) => data.name == name);
  if (thisItemInCart.length > 0) {
    doesExistInCart = true;
  }
  return (
    <div className="weapon_card_2">
      <div className="weapon_card_2_image_div">
        <img src={imageURL} />
      </div>
      <div className="weapon_card_2_text_div">
        <div className="weapon_card_2_name_div">{name}</div>
        <div className="weapon_card_2_price_div">{price}</div>
        <div className="weapon_card_2_description_div">{description}</div>
      </div>
      {!doesExistInCart && (
        <div
          className="weapon_card_2_add_to_cart_div"
          onClick={handleAddToCart}
        >
          Add to Cart
        </div>
      )}
      {doesExistInCart && (
        <div className="weapon_card_2_add_to_cart_div">
          Added to Cart <i className="fa-regular fa-square-check fa-bounce" />
        </div>
      )}
    </div>
  );
};

export default WeaponCard2;
