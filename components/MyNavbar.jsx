import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { serverURL } from "../config/Variables";
import localPath from "node-dev/lib/local-path";
import { ToastContainer, toast } from "react-toastify";
import UploadProduct from "./UploadProduct";

let MyNavbar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userData = useSelector((state) => state.userData);
  let cartData = useSelector((state) => state.cartData);
  let handleSearch = (e) => {
    e.preventDefault();
    let searchValue = e.target.value;
    dispatch({
      type: "SEARCH",
      payload: searchValue,
    });
  };
  useEffect(() => {
    let authToken = localStorage.getItem("WeaponizeAR7");
    if (authToken) {
      axios
        .post(`${serverURL}/api/user/verify_user`, { authToken })
        .then((res) => {
          dispatch({
            type: "LOGIN",
            payload: res.data.userData,
          });

          if (res.data.userData.isBanned) {
            navigate("/banned");
            throw new Error("You are Banned.");
          }
          console.log("Login Successfull");
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post(`${serverURL}/api/product/get_products_selled_by_user`)
        .then((response) => {
          dispatch({
            type: "ADD_PRODUCTS_SELLED_BY_USERS",
            payload: response.data.productsData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    let savedCartData = JSON.parse(localStorage.getItem("WeaponizeAR7_Cart"));
    if (savedCartData) {
      dispatch({
        type: "ADD_SAVED_CART_DATA",
        payload: savedCartData,
      });
    }
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      localStorage.setItem("WeaponizeAR7_Cart", JSON.stringify(cartData));
    }
  }, [cartData]);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <ToastContainer />
      <Container fluid>
        <Navbar.Brand href="#">WeaponizeAR7</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{
              maxHeight: "100px",
            }}
            navbarScroll
          >
            <Link
              className="nav-link"
              to="/"
              style={{ textDecoration: "none", color: "initial" }}
            >
              Home
            </Link>{" "}
            {!userData && (
              <Link
                className="nav-link"
                to="/login"
                style={{ textDecoration: "none", color: "initial" }}
              >
                Login
              </Link>
            )}
            {!userData && (
              <Link
                className="nav-link"
                to="/signup"
                style={{ textDecoration: "none", color: "initial" }}
              >
                Signup
              </Link>
            )}
            {userData && (
              <Link
                className="nav-link"
                to="/cart"
                style={{ textDecoration: "none", color: "initial" }}
              >
                Cart({cartData.length})
                <i className="fa-solid fa-cart-shopping fa-beat" />
              </Link>
            )}
            {userData && (
              <Link
                className="nav-link"
                to="/uploadproduct"
                style={{ textDecoration: "none", color: "initial" }}
              >
                Upload Product
              </Link>
            )}
            {userData && (
              <Link
                className="nav-link"
                to="/orderhistory"
                style={{ textDecoration: "none", color: "initial" }}
              >
                Order History{" "}
                <i className="fa-solid fa-clock-rotate-left fa-bounce" />
              </Link>
            )}
            {userData && (
              <Link
                className="nav-link"
                to="/adminpanel"
                style={{ textDecoration: "none", color: "initial" }}
              >
                Admin Panel <i className="fa-solid fa-person-military-rifle" />
              </Link>
            )}
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
            {userData && (
              <Link
                className="nav-link"
                to="/logout"
                style={{ textDecoration: "none", color: "initial" }}
              >
                Logout
              </Link>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleSearch}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
