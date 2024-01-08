import React, { useState } from "react";
import ReactDom from "react-dom";
import "./../styles/edit_product_modal.css";
import { ToastContainer, toast } from "react-toastify";
import { serverURL } from "../config/Variables";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditSavedProducts = (props) => {
  let { handleCloseEditModal, isOpen, name, description, price, imageURL } =
    props.properties;

  if (isOpen == false) {
    return;
  }
  // YOU CAN NOT DEFINE ANY STATE BEFORE if(isopen), IT WILL RETURN ERROR.
  let [processing, setProcessing] = useState(false);
  let [newName, setNewName] = useState(name);
  let [newPrice, setNewPrice] = useState(price);
  let [newDescription, setNewDescription] = useState(description);
  let [image, setImage] = useState(null);
  let navigate = useNavigate();
  let handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  let handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };
  let handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };
  let handleImageChange = (e) => {
    let file = e.target.files[0];
    let maxSizeInKB = 500;
    let allowedTypes = ["image/jpeg"];
    if (file && !allowedTypes.includes(file.type)) {
      toast("Please Select a Valid JPG File.");
      e.target.value = null;
      return;
    }
    if (file && file.size > maxSizeInKB * 1024) {
      e.target.value = null;
      toast("Image Size can not Exceed 500 KB.");
      return;
    }
    setImage(file);
  };
  let handleConfirmChange = (e) => {
    e.preventDefault();
    if (
      newName == name &&
      newPrice == price &&
      newDescription == description &&
      image == null
    ) {
      toast("No Changes have been made to your Documents.");
      return;
    }
    let myFormData = new FormData();
    if (image != null) {
      myFormData.append("MyImage", image, image.name);
    }
    myFormData.append("newName", newName);
    myFormData.append("newPrice", newPrice);
    myFormData.append("newDescription", newDescription);
    myFormData.append("oldName", name);
    myFormData.append("imageURL", imageURL);
    let authToken = localStorage.getItem("WeaponizeAR7");
    setProcessing(true);
    axios
      .post(`${serverURL}/api/product/update_product`, myFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      })
      .then((res) => {
        setProcessing(false);
        toast(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setProcessing(false);
        console.log(error);
      });
  };

  return ReactDom.createPortal(
    <>
      <ToastContainer />
      <div className="edit_product_modal_background"></div>
      <div className="edit_product_modal_div">
        <div
          className="edit_product_modal_cross_button"
          onClick={handleCloseEditModal}
        >
          X
        </div>
        <form
          className="edit_product_modal_form"
          onSubmit={handleConfirmChange}
        >
          <div>
            <label>Name</label>
            <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            <label>Price</label>
            <input
              value={newPrice}
              onChange={handlePriceChange}
              type="number"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={newDescription}
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="file"
              className="file_input"
              onChange={handleImageChange}
            />
          </div>
          <div className="edit_product_modal_form_submit_button_div">
            {!processing && <button type="submit">Confirm Changes</button>}
            {processing && (
              <button>
                Saving <i className="fa-solid fa-spinner fa-spin" />
              </button>
            )}
          </div>
        </form>
        {/* <button onClick={handleCloseEditModal}>Close</button> */}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditSavedProducts;
