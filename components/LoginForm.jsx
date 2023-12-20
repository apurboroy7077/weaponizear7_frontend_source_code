import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../config/Variables";
import { ToastContainer, toast } from "react-toastify";

let Loginform = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [logging, setLogging] = useState(false);
  let navigate = useNavigate();
  let handleLogin = (e) => {
    e.preventDefault();
    setLogging(true);
    axios
      .post(`${serverURL}/api/user/login`, { email, password })
      .then((res) => {
        setLogging(false);
        localStorage.setItem("WeaponizeAR7", res.data.authToken);
        navigate("/");
      })
      .catch((error) => {
        setLogging(false);
        console.log(error);
        toast(error.response.data.message);
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
      onSubmit={handleLogin}
    >
      <ToastContainer />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{ color: "white" }}>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{ color: "white" }}>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        style={{ boxShadow: "2px 2px 2px black" }}
      >
        {!logging && <>Login</>}
        {logging && (
          <>
            Logging In <i className="fa-solid fa-spinner fa-spin" />
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
          navigate("/signup");
        }}
      >
        Do not have an Account?
      </button>
    </Form>
  );
};

export default Loginform;
