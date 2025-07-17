        // src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminHome from "./components/AdminHome";
import ManageUsers from "./components/ManageUsers";
import SellerHome from "./components/SellerHome";
import UserCategory from './components/usercategory';

import UserProduct from './components/userproduct';
import OrderConfirmation from './components/OrderConfirmation';
import Cart from './components/Cart';
import SimulatePayment from './components/simulatepayment';
import FinalOrder from "./components/FinalOrder";
import PaymentPage from './components/PaymentPage';
import PaymentSuccess from './components/PaymentSuccess';
import OAuthSuccessRedirect from './components/OAuthSuccessRedirect';
import MyProfile from './components/MyProfile';
import WishlistPage from './components/WishlistPage';
import AddProduct from './components/AddProduct';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Router>
            <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/sellerhome" element={<SellerHome />} />
        <Route path="/usercategory" element={<UserCategory />} />
        <Route path="/userproducts/:categoryName" element={<UserProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/simulatepayment" element={<SimulatePayment />} />
        <Route path="/finalorder" element={<FinalOrder />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

        <Route path="/oauth-success" element={<OAuthSuccessRedirect />} />
        <Route path="/myprofile" element={<MyProfile />} /> 
        <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/add-product" element={<AddProduct />} />
                




      </Routes>
    </Router>
  );
}

export default App;
