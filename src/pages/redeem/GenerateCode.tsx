import React from 'react'
import Layout from "../dashboard/Layout";
import FormGenerateCode from '../../components/redeem/FormGenerateCode'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GenerateCode = () => {
    return (
        <Layout>
            <FormGenerateCode />
            <ToastContainer
                position="top-center"
                autoClose={3000} // Durasi auto close dalam milidetik (misal: 3000 = 3 detik)
                style={{
                    fontSize: '18px',
                    padding: '20px',
                }}
            />
        </Layout>
    )
}

export default GenerateCode