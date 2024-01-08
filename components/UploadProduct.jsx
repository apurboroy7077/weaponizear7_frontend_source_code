import React, { useState } from "react";
import { serverURL } from "../config/Variables";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UploadProduct = () => {
  let [selectedImage, setSelectedImage] = useState(null);
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [submitLoading, setSubmitLoading] = useState(false);
  let handleImageSelect = (e) => {
    let file = e.target.files[0];
    let maxSizeKB = 500;
    let allowedTypes = ["image/jpeg"];
    if (file && !allowedTypes.includes(file.type)) {
      toast("Please Select a Valid JPG File.");
      e.target.value = null;
      return;
    }
    if (file && file.size > maxSizeKB * 1024) {
      e.target.value = null;
      toast("Image Size can not Exceed 500 KB.");
      return;
    }
    setSelectedImage(e.target.files[0]);
  };
  let handleNameChange = (e) => {
    setName(e.target.value);
  };
  let handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  let handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  let handleSubmitProduct = (e) => {
    e.preventDefault();
    console.log(name, price, description);
    if (!selectedImage) {
      return;
    }
    let myFormData = new FormData();
    myFormData.append("MyImage", selectedImage, selectedImage.name);
    myFormData.append("productName", name);
    myFormData.append("productPrice", price);
    myFormData.append("productDescription", description);
    setSubmitLoading(true);
    let authToken = localStorage.getItem("WeaponizeAR7");
    axios
      .post(`${serverURL}/api/product/upload_product`, myFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      })
      .then((response) => {
        setSubmitLoading(false);
        toast(response.data.message);
        console.log(response);
        setName("");
        setPrice("");
        setDescription("");
        setSelectedImage(null);
      })
      .catch((error) => {
        setSubmitLoading(false);
        toast(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <div
      style={{
        color: "white",
        maxWidth: "300px",
        margin: "auto",
        marginTop: "1rem",
      }}
    >
      <ToastContainer />
      <form onSubmit={handleSubmitProduct}>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            onChange={handleNameChange}
            value={name}
            placeholder="Product Name"
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            onChange={handlePriceChange}
            value={price}
            placeholder="Product Price"
            type="number"
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            onChange={handleDescriptionChange}
            value={description}
            placeholder="Product Description"
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", opacity: "0.6" }}
          >
            Image of Your Product
          </label>
          <input
            style={{ width: "100%" }}
            type="file"
            onChange={handleImageSelect}
            required
          />
        </div>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          type="submit"
        >
          {!submitLoading && <>Submit Product</>}
          {submitLoading && (
            <>
              Saving <i className="fa-solid fa-spinner fa-spin" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
