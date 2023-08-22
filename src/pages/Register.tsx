import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
    const [selectedRole, setSelectedRole] = useState('');
    const [secretKey, setSecretKey] = useState('');
    var secretKeyAdmin = "qwe123"
    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
        setSecretKey('');
    };

    const handleSecretKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecretKey(event.target.value);
    };

    const isSecretKeyRequired = selectedRole === 'admin' && secretKeyAdmin;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (isSecretKeyRequired && secretKey != secretKeyAdmin) {
            alert("Secret Key Not Matched")
            console.log('Mohon masukkan kunci rahasia.');
        } else {
            console.log('Submit form dengan role:', selectedRole, 'dan secret key:', secretKey);
        }
    };

    return (
        <div className='signup template d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className='form_container p-5 rounded bg-white'>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Sign up</h3>
                    <div className='mb-2'>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" placeholder='Enter Name' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" placeholder='Enter Email' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" placeholder='Enter Password' className='form-control' />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="role" className="form-label">
                            Role:
                        </label>
                        <select
                            name="role"
                            id="role"
                            className="form-select"
                            value={selectedRole}
                            onChange={handleRoleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    {isSecretKeyRequired && (
                        <div className="mb-2">
                            <label htmlFor="secretKey" className="form-label">
                                Secret Key:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="secretKey"
                                value={secretKey}
                                onChange={handleSecretKeyChange}
                            />
                        </div>
                    )}
                    <div className='d-grid mt-2'>
                        <button className='btn btn-primary'>Sign up</button>
                    </div>
                    <p className='text-end mt-2'>
                        Already Registered <Link to="/" className='ms-2'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
