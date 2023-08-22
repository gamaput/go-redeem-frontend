import React from 'react'
import Layout from '../dashboard/Layout'
import FormAddPrize from '../../components/prize/FormAddPrize'
import { ToastContainer } from 'react-toastify'

const AddPrize = () => {
  return (
    <Layout>
        <FormAddPrize/>
        <ToastContainer />
    </Layout>
  )
}

export default AddPrize
