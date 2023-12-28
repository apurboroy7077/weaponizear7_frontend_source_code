import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { serverURL } from "../config/Variables";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

let SignupForm = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [address, setAddress] = useState("");
  let [displayMessage, setDisplayMessage] = useState("");
  let [errorMessage, setErrorMessage] = useState(false);
  let [successMessage, setSuccessMessage] = useState(false);
  let [signingup, setSigningup] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let handleSignup = (e) => {
    e.preventDefault();
    //console.log(name, email, password, confirmPassword, address);
    if (password != confirmPassword) {
      setDisplayMessage("Confirm Password Correctly!");
      return;
    }
    let userData = { name, email, password, address };
    setSigningup(true);
    axios
      .post(`${serverURL}/api/user/signup`, userData)
      .then((response) => {
        setSigningup(false);
        console.log(response);
        setSuccessMessage(response.data.message);
        let authToken = response.data.authToken;
        setErrorMessage(false);
        localStorage.setItem("WeaponizeAR7", authToken);
        navigate("/");
      })
      .catch((error) => {
        setSigningup(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
        setSuccessMessage(false);
      });
  };
  return (
    <Form
      style={{
        width: "50rem",
        border: "2px solid white",
        padding: "1rem",
        paddingBottom: "1.5rem",
        boxShadow: "5px 5px 5px black",
      }}
      onSubmit={handleSignup}
    >
      {displayMessage && (
        <Form.Label style={{ color: "white" }}>{displayMessage}</Form.Label>
      )}
      {successMessage && (
        <Form.Label style={{ color: "lawngreen" }}>{successMessage}</Form.Label>
      )}
      {errorMessage && (
        <Form.Label style={{ color: "red" }}>{errorMessage}</Form.Label>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{ color: "white" }}>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{ color: "white" }}>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{ color: "white" }}>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{ color: "white" }}>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={confirmPassword}
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{ color: "white" }}>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Address"
          value={address}
          required
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {!signingup && <> Signup</>}
        {signingup && (
          <>
            Signing Up <i className="fa-solid fa-spinner fa-spin" />
          </>
        )}
      </Button>
      <button
        style={{
          backgroundColor: "transparent",
          color: "white",
          margin: "1rem",
          border: "1px solid white",
          padding: "0.5rem 1rem",
          boxShadow: "5px 5px 5px black",
        }}
        onClick={() => {
          navigate("/login");
        }}
      >
        Already Have An Account?
      </button>
    </Form>
  );
};

export default SignupForm;
