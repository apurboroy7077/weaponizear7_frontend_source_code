import React, { useState } from "react";
import { serverURL } from "../config/Variables";
import axios from "axios";

const UploadProduct = () => {
  let [selectedImage, setSelectedImage] = useState(null);
  let handleImageSelect = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  let handleUpload = () => {
    if (!selectedImage) {
      return;
    }
    let myFormData = new FormData();
    myFormData.append("MyImage", selectedImage, selectedImage.name);
    axios
      .post(`${serverURL}/api/product/upload_product`, myFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={{ color: "white" }}>
      <div>
        <input type="file" onChange={handleImageSelect} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default UploadProduct;
