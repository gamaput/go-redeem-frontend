import React from 'react'
import Layout from '../dashboard/Layout'
import FormAddUser from '../../components/user/FormAddUser'
import { ToastContainer } from 'react-toastify'

const AddUser = () => {
  return (
    <Layout>
        <FormAddUser/>
        <ToastContainer/>
    </Layout>
  )
}

export default AddUser
