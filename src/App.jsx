import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Shop from "./Pages/Shop";
import CategoryPage from "./Pages/CategoryPage";
import Cart from "./Pages/Cart"
import Error from "./Pages/Error";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductInfo from "./Pages/ProductInfo";
import ScrollTop from "./Components/ScrollTop";

import UserDashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddProductPage from "./Components/Admin/AddProductPage";
import UpdateProductPage from "./Components/Admin/UpdateProductPage";
import MyState from "./Context/MyState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./Components/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./Components/ProtectedRouteForAdmin";
import Signup from "./Pages/SIgnup";
import SignIN from "./Pages/SignIn";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import BuyNow from "./Components/BuyNow";
import { Switch } from "@material-tailwind/react";

const App = () => {


  return (

    <MyState >
      <BrowserRouter>
      <Header/>

        <ScrollTop />
        <Switch>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/buy-now" element={<BuyNow/>} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIN />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/tandc" element={<TermsAndConditions />} />

          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />

          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin >
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />

          <Route path="/AddProductPage" element={
            <ProtectedRouteForAdmin >
              <AddProductPage />
            </ProtectedRouteForAdmin>} />

          <Route path="/update-product/:id" element={
          <ProtectedRouteForAdmin >
            <UpdateProductPage />
            </ProtectedRouteForAdmin>} />

          <Route path="/error" element={<Error />} />
        </Routes>
            </Switch>
        <Footer />
        <Toaster />

      </BrowserRouter>
    </MyState>
  );
};

export default App;
