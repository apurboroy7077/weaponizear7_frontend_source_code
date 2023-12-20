import React from "react";

const Banned = () => {
  const bannedStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "24px",
    fontWeight: "bold",
    backgroundColor: "#1c1c1c",
    color: "#cc0000",
  };

  return <div style={bannedStyles}>You are banned.</div>;
};

export default Banned;
