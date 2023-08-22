import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { RootState } from '../../app/store';

interface User {
  ID: number;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

const Userlist = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  // const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/users/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      // console.log(response.data)
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        const token = sessionStorage.getItem('token');
        await axios.delete(`http://localhost:8081/api/users/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        getUsers(); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>List of Users</h2>
      <Link to='/users/add' className='button is-primary mb-2'>
        Add New User
      </Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.ID}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/edit/${user.ID}`} className='button is-small is-info mr-2'>
                  Edit
                </Link>
                <button
                  className='button is-small is-danger'
                  onClick={() => deleteUser(user.ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
