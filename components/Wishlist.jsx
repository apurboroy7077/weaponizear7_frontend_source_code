import React from "react";
import "./../styles/wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import ar7id from "ar7id";
const Wishlist = () => {
  let wishList = useSelector((state) => state.wishList);
  let cartData = useSelector((state) => state.cartData);
  let productsData = useSelector((state) => state.productData);
  let dispatch = useDispatch();
  let handleAddToCart = (data) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: data,
    });
  };
  let handleRemoveFromWishList = (name) => {
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: name,
    });
  };
  return (
    <div className="wishlist">
      <div className="wishlist_heading">
        <i className="fa-solid fa-heart-circle-check" />
        <div>My Wishlist</div>
        {wishList.length < 1 && (
          <p className="nothing_in_wishlist_message">
            You have Nothing in Your WishList, Yet!
          </p>
        )}
      </div>
      <div className="wishlist_table_div">
        <table className="wishlist_table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishList.map((item) => {
              let thisProduct = productsData.filter(
                (data) => data.name == item
              );
              let { name, price, description } = thisProduct[0];
              let isInCart = false;
              let checkIsInCart = () => {
                let thisItemCartData = cartData.filter(
                  (item) => item.name == name
                );
                if (thisItemCartData.length > 0) {
                  isInCart = true;
                } else {
                  isInCart = false;
                }
              };
              checkIsInCart();
              return (
                <tr key={ar7id()}>
                  <td>{name}</td>
                  <td>{price} Tk/-</td>
                  <td>
                    <span className="in_stock_text_wishlist">In Stock</span>
                  </td>
                  <td className="wishlist_table_buttons_td">
                    {!isInCart && (
                      <button
                        className="add_to_cart_wishlist_button"
                        onClick={() => {
                          handleAddToCart(thisProduct[0]);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                    {isInCart && (
                      <button className="add_to_cart_wishlist_button">
                        Added to Cart{" "}
                        <i className="fa-regular fa-circle-check" />
                      </button>
                    )}
                    <button
                      className="remove_from_wishlist_button"
                      onClick={() => {
                        handleRemoveFromWishList(name);
                      }}
                    >
                      Remove from Wishlist
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
