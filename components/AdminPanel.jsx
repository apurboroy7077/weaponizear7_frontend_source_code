import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverURL } from "../config/Variables";
import ar7id from "ar7id";
import { ToastContainer, toast } from "react-toastify";

const AdminPanel = () => {
  let [totalUsers, setTotalUsers] = useState(0);
  let [totalOrders, setTotalOrders] = useState(0);
  let [searchUser, setSearchUser] = useState("");
  let [foundUser, setFoundUser] = useState([]);
  let [searching, setSearching] = useState(false);
  let [banning, setBanning] = useState(false);
  let [unbanning, setUnbanning] = useState(false);
  let [targetedEmail, setTargetedEmail] = useState(null);
  let [loadingTotalUsers, setLoadingTotalUsers] = useState(true);
  let [loadingTotalOrders, setLoadingTotalOrders] = useState(true);
  useEffect(() => {
    axios
      .post(`${serverURL}/api/admin/get_total_users_number`)
      .then((response) => {
        setLoadingTotalUsers(false);
        setTotalUsers(response.data.totalUsers);
      })
      .catch((error) => {
        setLoadingTotalUsers(false);
        console.log(error);
      });
    axios
      .post(`${serverURL}/api/admin/get_total_orders_number`)
      .then((response) => {
        setLoadingTotalOrders(false);
        setTotalOrders(response.data.totalUsers);
      })
      .catch((error) => {
        setLoadingTotalOrders(false);
        console.log(error);
      });
  });
  let handleSearch = () => {
    setSearching(true);
    axios
      .post(`${serverURL}/api/admin/search_user`, { searchUser })
      .then((res) => {
        setSearching(false);
        setFoundUser(res.data.userData);
      })
      .catch((error) => {
        setSearching(false);
        console.log(error);
      });
  };
  let handleBanUser = (userEmail) => {
    setTargetedEmail(userEmail);
    // setBanning(true);
    // axios
    //   .post(`${serverURL}/api/admin/ban_user`, { email: userEmail })
    //   .then((res) => {
    //     console.log(res);
    //     let foundUsers_ = [...foundUser];
    //     let user = foundUsers_.filter((data) => data.email == userEmail);
    //     user[0].isBanned = true;
    //     setFoundUser(foundUsers_);
    //     setBanning(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setBanning(false);
    //   });
    toast(
      "Ban function is Currently Disabled because Admin Panel is currently Opened for Everyone."
    );
  };
  let handleUnbanUser = (userEmail) => {
    setUnbanning(true);
    setTargetedEmail(userEmail);
    axios
      .post(`${serverURL}/api/admin/unban_user`, { email: userEmail })
      .then((res) => {
        console.log(res);
        let foundUsers_ = [...foundUser];
        let user = foundUsers_.filter((data) => data.email == userEmail);
        user[0].isBanned = false;
        setFoundUser(foundUsers_);
        setUnbanning(false);
      })
      .catch((error) => {
        console.log(error);
        setUnbanning(false);
      });
  };
  let updateBanningState = (userEmail, isBanning) => {
    let updatedUsers = foundUser.map((user) => {
      if (user.email === userEmail) {
        return { ...user, banning: isBanning };
      }
      return user;
    });
    setFoundUser(updatedUsers);
  };
  return (
    <div
      className="adminPanel"
      style={{
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#333",
      }}
    >
      <ToastContainer />
      <div>
        <h3>
          Total Users: {!loadingTotalUsers && <>{totalUsers}</>}{" "}
          {loadingTotalUsers && (
            <>
              Loading <i className="fa-solid fa-spinner fa-spin" />
            </>
          )}
        </h3>
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h3>
          Total Orders: {!loadingTotalOrders && <>{totalOrders}</>}{" "}
          {loadingTotalOrders && (
            <>
              Loading <i className="fa-solid fa-spinner fa-spin" />
            </>
          )}
        </h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Ban/Unban a User</h3>
        <input
          placeholder="Enter User Email or Id or Name or Address"
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
        />
        {!searching && (
          <button
            style={{
              padding: "10px",
              backgroundColor: "#555",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleSearch}
          >
            Search
          </button>
        )}
        {searching && (
          <button
            style={{
              padding: "10px",
              backgroundColor: "#555",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Searching <i className="fa-solid fa-spinner fa-spin" />
          </button>
        )}
        <ul style={{ listStyle: "none", padding: "0" }}>
          <li style={{ marginTop: "10px" }}>
            {foundUser.map((data) => {
              let { name, email, address, isBanned } = data;
              return (
                <div key={ar7id()}>
                  <div>Name: {name}</div>
                  <div>Email: {email}</div>
                  <div>Address: {address}</div>
                  {!isBanned && (
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ff0000",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleBanUser(email);
                        isBanned = true;
                      }}
                    >
                      {(!banning || (banning && email != targetedEmail)) && (
                        <>Ban</>
                      )}
                      {banning && email == targetedEmail && (
                        <>
                          Banning <i className="fa-solid fa-spinner fa-spin" />
                        </>
                      )}
                    </button>
                  )}{" "}
                  {isBanned && (
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "lawngreen",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleUnbanUser(email);
                      }}
                    >
                      {(!unbanning ||
                        (unbanning && email != targetedEmail)) && <>Unban</>}
                      {unbanning && email == targetedEmail && (
                        <>
                          Unbanning{" "}
                          <i className="fa-solid fa-spinner fa-spin" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
