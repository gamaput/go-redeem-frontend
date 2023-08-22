import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./pages/user/Users";
import Products from "./pages/product/Products";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import GenerateCode from "./pages/redeem/GenerateCode";
import RedeemCode from "./pages/redeem/RedeemCode";
import Redeems from "./pages/redeem/Redeems";
import ListRedeems from "./pages/redeem/ListRedeems";
import EditPrize from "./pages/prize/EditPrize"
import AddPrize from "./pages/prize/AddPrize";
import Prizes from "./pages/prize/Prizes"; 

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "./app/store";



// import UserFeature from './features/user/UserFeature';

const App: React.FC = () =>{
  const isAuthenticatedUser = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/generate-code" element={<GenerateCode />} />
          <Route path="/redeem-code" element={<RedeemCode />} />
          <Route path="/redeems" element={<Redeems />} />
          <Route path="/listredeems" element={<ListRedeems />} />
          <Route path="/prizes/edit/:id" element={<EditPrize />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/prizes/add" element={<AddPrize />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;