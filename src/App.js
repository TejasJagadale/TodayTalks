import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetail from "./components/ArticleDetail.js";
import Layout from "./components/Layout";
import "./styles/main.css";
import New from "./components/New";
import CategoryNav from "./components/CategoryNav.js";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/category/:category" element={<CategoryNav />} />
          <Route path="/news" element={<New />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
