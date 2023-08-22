import React, { useState, SyntheticEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut, IoCode, IoList, IoGiftSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
// import { reset ,UserState} from "../features/authSlice";
// import { AppDispatch, RootState } from '../app/store';
import { RootState } from "../../app/store";
import { logout, reset } from "../../features/auth/authSlice";


const Sidebar: React.FC = () => {
  const isAdminUser = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.isAdmin)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout() as any)
    dispatch(reset())
    navigate("/")
  }
  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"} >
              <IoHome /> Dashboard
            </NavLink>
          </li>
          {/* <li>
            <NavLink to={"/products"}>
              <IoPricetag /> Products
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to={"/redeem-code"}>
              <IoScan /> Redeem Code
            </NavLink>
          </li> */}
          <li>
            <NavLink to={"/redeems"}>
              <IoList /> Redeems Code
            </NavLink>
          </li>
        </ul>
        {isAdminUser.user?.role == 'admin' && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/generate-code"}>
                  <IoCode /> Generate Code
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/prizes"}>
                  <IoGiftSharp /> Prize
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/listredeems"}>
                  <IoList /> List Redeem
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={handleLogout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
