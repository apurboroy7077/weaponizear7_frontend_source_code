import React, { useState } from "react";
import testImage from "./../public/images/products/akm_1.jpg";
import "./../styles/own_product_card.css";
import Modal from "./Modal";
import EditSavedProducts from "./EditSavedProducts";
const OwnProductCard = (props) => {
  let { name, email, description, price, imageURL } = props.data;
  let [isOpen, setIsOpen] = useState(false);
  let [processing, setProcessing] = useState(false);
  let handleCloseEditModal = () => {
    setIsOpen(false);
  };
  let handleOpenEditModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="own_product_card">
      <div className="own_product_card_image_div">
        <img src={imageURL} />
      </div>
      <div className="own_product_card_text_div">
        <div className="title">{name}</div>
        <div className="description">{description}</div>
        <div className="price">{price}</div>
      </div>
      <div
        className="own_product_card_edit_button_div"
        onClick={handleOpenEditModal}
      >
        <div>Edit</div>
      </div>
      <EditSavedProducts
        properties={{
          isOpen,
          handleCloseEditModal,
          name,
          description,
          price,
          imageURL,
        }}
      />
    </div>
  );
};

export default OwnProductCard;
