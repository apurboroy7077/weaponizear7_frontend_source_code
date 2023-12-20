import React from "react";
import { useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
  };
  let handleLogout = () => {
    localStorage.removeItem("WeaponizeAR7");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div style={pageStyle}>
      <h2 style={{ color: "white" }}>Are you sure you want to logout?</h2>
      <div>
        <button
          style={{ ...buttonStyle, backgroundColor: "red", color: "white" }}
          onClick={handleLogout}
        >
          Yes
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: "green", color: "white" }}
          onClick={() => {
            navigate("/");
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Logout;
