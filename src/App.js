// react 
import React from "react";
// css
import "./App.css";
// browserrouter 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Header from './Component/Header';
import Footer from "./Component/Footer";
// pages
import Home from "./pages/Home";
// About pages
import AboutUs from "./pages/About/AboutUs";
import Blog from "./pages/About/Blog";
import BlogCategory from "./pages/About/BlogCategory";
import Contact from "./pages/About/Contact";
// Shop pages
import Shop from "./pages/Shop/Shop";
import ShopGridCol3 from "./pages/Shop/ShopGridCol3";
import ShopListCol from "./pages/Shop/ShopListCol";
import ShopCart from "./pages/Shop/ShopCart";
import ShopCheckOut from "./pages/Shop/ShopCheckOut";
import ShopWishList from "./pages/Shop/ShopWishList";
import SearchPage from "./pages/Shop/searchpage";
// Store pages
import StoreList from "./pages/store/StoreList";
import SingleShop from "./pages/store/SingleShop";
// Account pages
import MyAccountOrder from "./pages/Accounts/MyAccountOrder";
import MyAccountSetting from "./pages/Accounts/MyAcconutSetting";
import MyAcconutNotification from "./pages/Accounts/MyAcconutNotification";
import MyAcconutPaymentMethod from "./pages/Accounts/MyAcconutPaymentMethod";
import MyAccountAddress from "./pages/Accounts/MyAccountAddress";
import MyAccountForgetPassword from "./pages/Accounts/MyAccountForgetPassword";
import MyAccountSignIn from "./pages/Accounts/MyAccountSignIn";
import MyAccountSignUp from "./pages/Accounts/MyAccountSignUp";
import AdminCategoryList from "./pages/Admin/AdminCategorylist";
import AdminSubCategoryList from "./pages/Admin/Adminsubcategorylist";
import AdminCityList from "./pages/Admin/AdminCitylist";
import AdminProductList from "./pages/Admin/AdminProductlist";
import AddCategory from "./pages/Admin/AddCategory";
// import AddCity from "./pages/Admin/Addcity";
import AddCity from "./pages/Admin/AddCity"; // Ensure 'C' is capitalized
import EditCategory from "./pages/Admin/EditCategory";
import EditCity from "./pages/Admin/EditCity";
import AdminEditSubCategory from "./pages/Admin/AdminEditSubCategory";
import AdminAddSubCategory from "./pages/Admin/AdminAddSubCategory";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import PrivacyPolicy from "./pages/Accounts/privacypolicy";


// import ProductDetails from "./components/ProductDetails";
import ProductDetails from "./pages/Shop/ProductDetails";
const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Shop pages */}
          <Route path="/Shop" element={<Shop />} />
          <Route path="/ShopGridCol3" element={<ShopGridCol3 />} />
          <Route path="/ShopListCol" element={<ShopListCol />} />
          <Route path="/ShopWishList" element={<ShopWishList />} />
          <Route path="/ShopCheckOut" element={<ShopCheckOut />} />
          <Route path="/ShopCart" element={<ShopCart />} />
          {/* <Route path="/shop" element={<SearchPage />} /> */}
          <Route path="/search" element={<SearchPage />} />
          {/* Store pages */}
          <Route path="/StoreList" element={<StoreList />} />
          <Route path="/SingleShop" element={<SingleShop />} />
          {/* Accounts pages */}
          <Route path="/MyAccountOrder" element={<MyAccountOrder />} />
          <Route path="/MyAccountSetting" element={<MyAccountSetting />} />
          <Route path="/MyAcconutNotification" element={<MyAcconutNotification />} />
          <Route path="/MyAcconutPaymentMethod" element={<MyAcconutPaymentMethod />} />
          <Route path="/MyAccountAddress" element={<MyAccountAddress />} />
          <Route path="/MyAccountForgetPassword" element={<MyAccountForgetPassword />} />
          <Route path="/MyAccountSignIn" element={<MyAccountSignIn />} />
          <Route path="/MyAccountSignUp" element={<MyAccountSignUp />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

          {/* Admin pages */}
          <Route path="/AdminCategoryList" element={<AdminCategoryList />} />
          <Route path="/AdminSubCategoryList" element={<AdminSubCategoryList />} />
<Route path="/AdminProductList" element={<AdminProductList />} />
<Route path="/AdminCityList" element={<AdminCityList />} />
<Route path="/AddCategory" element={<AddCategory />} /> {/* Fixed spacing */}
<Route path="/AddCity" element={<AddCity />} /> {/* Fixed spacing */}
<Route path="/EditCategory/:id" element={<EditCategory />} />
<Route path="/EditCity/:id" element={<EditCity />} />
<Route path="/AdminEditSubCategory/:id" element={<AdminEditSubCategory />} />
<Route path="/AdminAddSubCategory" element={<AdminAddSubCategory />} /> {/* Fixed spacing */}
<Route path="/AdminAddProduct" element={<AdminAddProduct />} />
<Route path="/AdminEditProduct/:id" element={<AdminEditProduct />} />




          {/* About pages */}
          <Route path="/Blog" element={<Blog />} />
          <Route path="/BlogCategory" element={<BlogCategory />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ProductDetails" element={<ProductDetails />} />

        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
