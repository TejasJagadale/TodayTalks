import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Layout.css"

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;