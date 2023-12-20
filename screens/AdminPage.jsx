import React from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import AdminPanel from "../components/AdminPanel";

const AdminPage = () => {
  return (
    <div>
      <header>
        <MyNavbar />
      </header>
      <main style={{ minHeight: "85vh" }}>
        <AdminPanel />
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default AdminPage;
