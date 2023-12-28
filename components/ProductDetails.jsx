import React, { useEffect, useState } from "react";
import image from "./../public/images/products/m416_1.jpg";
import { useDispatch, useSelector } from "react-redux";
const ProductDetails = () => {
  let [isInWishlist, setIsInWishList] = useState(false);

  let name = localStorage.getItem("WEAPONIZEAR7_SELECTED_PRODUCT");
  let myProducts = useSelector((state) => state.productData);
  let wishList = useSelector((state) => state.wishList);
  let thisProduct = myProducts.filter((product) => name == product.name);
  thisProduct = thisProduct[0];
  let { price, description } = thisProduct;
  let srcName = name.toLowerCase();
  let image1 = `/images/products/${srcName}_1.jpg`;
  let image2 = `/images/products/${srcName}_2.jpg`;
  let dispatch = useDispatch();
  let handleAddToWishlist = () => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: name,
    });
  };
  let checkIfInWishList = () => {
    if (wishList.includes(name)) {
      setIsInWishList(true);
    }
  };
  useEffect(() => {
    checkIfInWishList();
  }, [wishList]);
  let handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: thisProduct,
    });
  };
  let cartData = useSelector((state) => state.cartData);
  let isInCart = false;
  let checkIfInCart = () => {
    let thisItemCart = cartData.filter((item) => item.name == name);
    if (thisItemCart.length > 0) {
      isInCart = true;
    } else {
      isInCart = false;
    }
  };
  checkIfInCart();
  return (
    <div className="product_details">
      <div className="product_details_1">
        <div className="product_details_1_1">
          <div className="product_details_1_1_1">
            <img className="product_image" src={image1} />
          </div>
        </div>
        <div className="product_details_1_2">
          <div className="product_details_1_2_1">
            <div className="product_details_1_2_1_1">
              <div className="product_details_1_2_1_1_1">Test</div>
              <div className="product_details_1_2_1_1_1">Store</div>
              <div className="product_details_1_2_1_1_1">Account</div>
              <div className="product_details_1_2_1_1_2">Victory Vault</div>
            </div>
            <div className="product_details_1_2_1_2">
              <img src={image2} />
            </div>
            <div className="product_details_1_2_1_3">
              <div className="product_details_1_2_1_3_1">{name}</div>
            </div>
            <div className="product_details_1_2_1_4">
              <div className="product_details_1_2_1_4_1">{description}</div>
            </div>
            <div className="product_details_1_2_1_5">
              <div className="product_details_1_2_1_5_1">
                Price: {price} TK/-
              </div>
            </div>
            <div className="product_details_1_2_1_6">
              <div className="product_details_1_2_1_6_1">
                <div className="product_details_1_2_1_6_1_1">
                  {!isInWishlist && (
                    <button onClick={handleAddToWishlist}>
                      Add to Wishlist <i className="fa-solid fa-heart" />
                    </button>
                  )}
                  {isInWishlist && (
                    <button>
                      Added to Wishlist{" "}
                      <i className="fa-solid fa-heart-circle-check" />
                    </button>
                  )}
                </div>
                <div className="product_details_1_2_1_6_1_2">
                  {!isInCart && (
                    <button onClick={handleAddToCart}>
                      Add to Cart <i className="fa-brands fa-opencart" />
                    </button>
                  )}
                  {isInCart && (
                    <button>
                      Added to Cart <i className="fa-regular fa-circle-check" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
