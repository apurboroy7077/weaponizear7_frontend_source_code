import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverURL } from "../config/Variables";
import { useSelector } from "react-redux";
import ar7id from "ar7id";

const OrderHistory = () => {
  let [orderData, setOrderData] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    let authToken = localStorage.getItem("WeaponizeAR7");
    if (authToken) {
      axios
        .post(`${serverURL}/api/product/orderhistory`, { authToken })
        .then((res) => {
          setLoading(false);
          console.log(res);
          setOrderData(res.data.orderData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h3 style={{ textAlign: "center", margin: "20px" }}>
        Order History <i className="fa-regular fa-clock" />
      </h3>
      {loading && (
        <h3 style={{ textAlign: "center", margin: "20px" }}>
          Loading <i className="fa-solid fa-spinner fa-spin" />
        </h3>
      )}
      {!loading && (
        <div>
          {orderData.length < 1 && (
            <h4 style={{ textAlign: "center", color: "red" }}>
              You did not Placed Any Order Yet
            </h4>
          )}
          {orderData.map((data) => {
            let { orderedOn, orders } = data;
            orderedOn = new Date(orderedOn);
            orderedOn = orderedOn.toLocaleString();
            return (
              <div
                key={ar7id()}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "15px",
                  boxShadow: "5px 5px 5px black",
                }}
              >
                <div style={{ marginBottom: "10px" }}>Date: {orderedOn}</div>
                <div>
                  {orders.map((item) => {
                    let { name, quantity } = item;
                    return (
                      <div
                        key={ar7id()}
                        style={{
                          marginBottom: "5px",
                          border: "2px solid lawngreen",
                          padding: "1rem",
                          margin: "1rem",
                          boxShadow: "3px 3px 3px black",
                        }}
                      >
                        <div>
                          <strong>Name:</strong>{" "}
                          <span style={{ opacity: "0.6" }}>{name}</span>
                        </div>
                        <div>
                          <strong>Quantity:</strong>{" "}
                          <span style={{ opacity: "0.6" }}>{quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
