import ar7id from "ar7id";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import testimage from "../public/images/products/akm_1.jpg";
import { Button } from "react-bootstrap";
import axios from "axios";
import { serverURL } from "../config/Variables";
import { ToastContainer, toast } from "react-toastify";
let Cart = () => {
  let dispatch = useDispatch();
  let cartData = useSelector((state) => state.cartData);
  let [emptyCartMessage, setEmptyCartMessage] = useState(null);
  let [orderSuccessfull, setOrderSuccessfull] = useState(false);
  let [placingOrder, setPlacingOrder] = useState(false);
  let totalItems = cartData.length;
  let totalPrice = 0;
  for (let i = 0; i < cartData.length; i++) {
    let item = cartData[i];
    let itemPrice = Number(item.price) * Number(item.quantity);
    totalPrice = totalPrice + itemPrice;
  }
  let handleQuantityChange = (name, quantity) => {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { name, quantity },
    });
  };
  let handleDeleteFromCart = (name) => {
    console.log(name);
    dispatch({
      type: "DELETE_FROM_CART",
      payload: name,
    });
  };
  let handleSubmitOrder = async () => {
    if (cartData.length < 1) {
      setEmptyCartMessage(
        "Your Cart is Empty, Plz Add a Product to Cart to Place Order. "
      );
      toast.error("Your Cart is Empty, Cannot Place Order.", {
        toastStyle: { color: "red" },
      });
      return;
    }
    setEmptyCartMessage(null);
    let totalOrders = [];
    let authToken = localStorage.getItem("WeaponizeAR7");
    for (let i = 0; i < cartData.length; i++) {
      let cartItem = cartData[i];
      let { name, quantity } = cartItem;
      let orderItem = { name, quantity };
      totalOrders.push(orderItem);
    }
    let sendingData = { orders: totalOrders, authToken: authToken };
    setPlacingOrder(true);
    await axios
      .post(`${serverURL}/api/product/order`, sendingData)
      .then((res) => {
        setPlacingOrder(false);
        console.log(res);
        dispatch({
          type: "CLEAR_CART",
        });
        localStorage.removeItem("WeaponizeAR7_Cart");
        setOrderSuccessfull(true);
        toast.success("Order Placed Successfully.", {
          toastStyle: {
            background: "#4CAF50",
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        });
      })
      .catch((error) => {
        setPlacingOrder(false);
        console.log(error);
        toast.error("Something Went Wrong", {
          toastStyle: {
            background: "#FF5722",
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        });
        setOrderSuccessfull(false);
      });
  };
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#1c1c1c" }}>
      <ToastContainer />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <Link
                        to="/"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          padding: "0.4rem 1rem",
                          border: "2px solid black",
                          borderRadius: "5px",
                          boxShadow: "2px 2px 2px black",
                        }}
                      >
                        Continue Shopping
                      </Link>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {totalItems} items in your cart
                        </p>
                      </div>
                      {/* <div>
                        <p>
                          <span className="text-muted">Sort by:</span>
                          <a href="#!" className="text-body">
                            price
                            <MDBIcon fas icon="angle-down mt-1" />
                          </a>
                        </p>
                      </div> */}
                    </div>
                    {/* Cards---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    {cartData.map((data) => {
                      return (
                        <MDBCard
                          className="mb-3"
                          key={ar7id()}
                          style={{ boxShadow: "3px 3px 3px black" }}
                        >
                          <MDBCardBody>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <MDBCardImage
                                    src={`/src/Apps2/A6_Gun_Shop/public/images/products/${data.name.toLowerCase()}_1.jpg`}
                                    fluid
                                    className="rounded-3"
                                    style={{ width: "65px" }}
                                    alt="Shopping item"
                                    onError={(e) => {
                                      e.target.onerror = null; // Prevents infinite loops in case the default image also fails to load
                                      e.target.src =
                                        "/src/Apps2/A6_Gun_Shop/public/images/products/default.jpg"; // Set default image source if the specified image fails to load
                                    }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <MDBTypography tag="h5">
                                    {data.name}
                                  </MDBTypography>
                                  {/* <p className="small mb-0">
                                    {data.description}
                                  </p> */}
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "50px" }}>
                                  <MDBTypography
                                    tag="h5"
                                    className="fw-normal mb-0"
                                  >
                                    <select
                                      value={data.quantity}
                                      onChange={(e) => {
                                        handleQuantityChange(
                                          data.name,
                                          e.target.value
                                        );
                                      }}
                                    >
                                      {Array.from({ length: 10 }).map(
                                        (nothing, i) => {
                                          if (i != 0) {
                                            return (
                                              <option key={ar7id()}>{i}</option>
                                            );
                                          }
                                        }
                                      )}
                                    </select>
                                  </MDBTypography>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <MDBTypography tag="h5" className="mb-0">
                                    $
                                    {Number(data.price) * Number(data.quantity)}
                                  </MDBTypography>
                                </div>
                                <a
                                  href="#!"
                                  style={{ color: "#cecece" }}
                                  onClick={(e) => {
                                    handleDeleteFromCart(data.name);
                                  }}
                                >
                                  <MDBIcon fas icon="trash-alt" />
                                </a>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      );
                    })}
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg-primary text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Card details
                          </MDBTypography>
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            fluid
                            className="rounded-3"
                            style={{ width: "45px" }}
                            alt="Avatar"
                          />
                        </div>

                        <p className="small">Card type</p>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-visa fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-amex fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                        </a>

                        <form className="mt-4">
                          <MDBInput
                            className="mb-4"
                            label="Cardholder's Name"
                            type="text"
                            size="lg"
                            placeholder="Cardholder's Name"
                            contrast
                          />

                          <MDBInput
                            className="mb-4"
                            label="Card Number"
                            type="text"
                            size="lg"
                            minLength="19"
                            maxLength="19"
                            placeholder="1234 5678 9012 3457"
                            contrast
                          />

                          <MDBRow className="mb-4">
                            <MDBCol md="6">
                              <MDBInput
                                className="mb-4"
                                label="Expiration"
                                type="text"
                                size="lg"
                                minLength="7"
                                maxLength="7"
                                placeholder="MM/YYYY"
                                contrast
                              />
                            </MDBCol>
                            <MDBCol md="6">
                              <MDBInput
                                className="mb-4"
                                label="Cvv"
                                type="text"
                                size="lg"
                                minLength="3"
                                maxLength="3"
                                placeholder="&#9679;&#9679;&#9679;"
                                contrast
                              />
                            </MDBCol>
                          </MDBRow>
                        </form>

                        <hr />

                        {/* <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">$4798.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">$4818.00</p>
                        </div> */}
                        {emptyCartMessage && (
                          <p style={{ color: "red" }}>{emptyCartMessage}</p>
                        )}
                        {orderSuccessfull && (
                          <p style={{ color: "white" }}>
                            Order Placed Successfully.
                          </p>
                        )}
                        <Button
                          size="lg"
                          style={{
                            backgroundColor: "green",
                            border: "1px solid white",
                            boxShadow: "3px 3px 3px black",
                          }}
                          onClick={handleSubmitOrder}
                        >
                          <div className="d-flex justify-content-between">
                            <span>${totalPrice}</span>
                            <span>
                              {!placingOrder && (
                                <>
                                  Place Order{" "}
                                  <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                </>
                              )}
                              {placingOrder && (
                                <>
                                  Placing Order{" "}
                                  <i className="fa-solid fa-spinner fa-spin" />
                                </>
                              )}
                            </span>
                          </div>
                        </Button>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
export default Cart;
