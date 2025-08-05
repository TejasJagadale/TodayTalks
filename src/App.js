import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetail from "./components/ArticleDetail.js";
import Layout from "./components/Layout";
import "./styles/main.css";
import New from "./components/New";
import CategoryNav from "./components/CategoryNav.js";
import PrivacyPolicy from "./components/PrivacyPolicy.js";
import TermsAndConditions from "./components/TermsandConditions.js";
// import AboutUs from "./pages/AboutUs.js";
import Contact from "./pages/Contact.js";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/search" element={<Home />} />
          <Route path="/category/:categoryName" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/category/:category" element={<CategoryNav />} />
          <Route path="/news" element={<New />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          {/* <Route path="/about" element={<AboutUs />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
