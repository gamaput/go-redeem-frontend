import React from 'react'
import Layout from '../dashboard/Layout'
import FormEditPrize from '../../components/prize/FormEditPrize'
import { ToastContainer } from 'react-toastify'

const EditProduct = () => {
  return (
    <Layout>
        <FormEditPrize/>
        <ToastContainer />
    </Layout>
  )
}

export default EditProduct
