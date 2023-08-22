import React from "react";
import Layout from "../dashboard/Layout";
import Redeemlist from "../../components/redeem/ListRedeem";
import { ToastContainer } from "react-toastify";

const ListRedeems = () => {
  return (
    <Layout>
      <Redeemlist/>
      <ToastContainer />
    </Layout>
  )
}

export default ListRedeems
