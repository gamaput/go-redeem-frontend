import React, { useEffect } from "react";
import Layout from "../dashboard/Layout";
import Userlist from "../../components/user/Userlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
// import { getMe } from "../features/authSlice";

const Users = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { isError, user } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //   }
  //   if (user && user.role !== "admin") {
  //     navigate("/dashboard");
  //   }
  // }, [isError, user, navigate]);

  return (
    <Layout>
      <Userlist />
    </Layout>
  );
};

export default Users;
