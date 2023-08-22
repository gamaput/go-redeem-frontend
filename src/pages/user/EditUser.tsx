import React from 'react'
import Layout from '../dashboard/Layout'
import FormEditUser from '../../components/user/FormEditUser'
import { ToastContainer } from 'react-toastify'

const EditUser = () => {
  return (
    <Layout>
        <FormEditUser/>
        <ToastContainer/>
    </Layout>
  )
}

export default EditUser
