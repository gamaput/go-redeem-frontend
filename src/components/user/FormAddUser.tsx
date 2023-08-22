import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

const FormAddUser: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const navigate = useNavigate();

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const newUser: User = { name, email, password, role };
            const token = sessionStorage.getItem('token');
            const response = await axios.post<User>('http://localhost:8081/api/users/add', newUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            setName('');
            setEmail('');
            setPassword('');
            setRole('');

            console.log('User added successfully', response.data);
            toast.success('User successfully added!');
            await new Promise((resolve) => setTimeout(resolve, 3000));
            navigate('/users');

        } catch (error) {
            // Tangkap dan tampilkan pesan error jika ada error saat menambahkan user
            toast.error('Failed to add user!');
        }
    };

    return (
        <div>
            <h1 className="title">Users</h1>
            <h2 className="subtitle">Add New User</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={submitHandler}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        type="email"
                                        className="input"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Role</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className='button is-success' type="submit">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddUser;
