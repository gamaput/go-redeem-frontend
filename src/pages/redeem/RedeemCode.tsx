import React from 'react'
import Layout from "../dashboard/Layout";
import FormRedeemCode from '../../components/redeem/FormRedeemCode'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RedeemCode = () => {
    return (
        <div>
            <FormRedeemCode />
            <ToastContainer
                position="top-center"
                autoClose={3000} // Durasi auto close dalam milidetik (misal: 3000 = 3 detik)
                style={{
                    fontSize: '18px',
                    padding: '20px',
                }}
            />
        </div>
    )
}

export default RedeemCode