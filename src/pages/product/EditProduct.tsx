import React from 'react'
import Layout from '../dashboard/Layout'
import FormEditProduct from '../../components/product/FormEditProduct'
import { ToastContainer } from 'react-toastify'

const EditProduct = () => {
  return (
    <Layout>
        <FormEditProduct/>
        <ToastContainer />
    </Layout>
  )
}

export default EditProduct
