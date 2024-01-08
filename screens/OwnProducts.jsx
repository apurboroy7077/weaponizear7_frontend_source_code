import React, { useEffect, useState } from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import OwnProductCard from "../components/OwnProductCard";
import ar7id from "ar7id";
import axios from "axios";
import { serverURL } from "../config/Variables";
import { toast } from "react-toastify";
let dummyProducts = [
  {
    name: "Example Product 1",
    price: 29.99,
    description: "This is the description for Example Product 1.",
    imageURL: "https://example.com/product1-image.jpg",
    email: "example1@example.com",
  },
  {
    name: "Sample Item 2",
    price: 49.95,
    description: "Description for Sample Item 2 goes here.",
    imageURL: "https://example.com/product2-image.jpg",
    email: "example2@example.com",
  },
  {
    name: "Test Product 3",
    price: 19.99,
    description: "This is a test description for Product 3.",
    imageURL: "https://example.com/product3-image.jpg",
    email: "example3@example.com",
  },
];
const OwnProducts = () => {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    let authToken = localStorage.getItem("WeaponizeAR7");
    axios
      .post(
        `${serverURL}/api/product/get_products_selled_by_specific_user`,
        {},
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="ownproducts_page">
      <header>
        <MyNavbar />
      </header>
      <main>
        <div className="ownproducts_card_div">
          {products.map((product) => {
            return <OwnProductCard key={ar7id()} data={product} />;
          })}
        </div>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default OwnProducts;
