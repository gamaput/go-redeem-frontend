import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { RootState } from '../../app/store';

interface Product {
  ID: number;
  name: string;
  description: string;
  price: string;
  quantity: string;
}
const Productlist = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [msg, setMsg] = useState('');
  // const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/products/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error: any) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        const token = sessionStorage.getItem('token');
        await axios.delete(`http://localhost:8081/api/products/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        getProducts(); 
      }
    } catch (error: any) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };
  
  return (
    <div>
      <h1 className='title'>Products</h1>
        <h2 className='subtitle'>List of Products</h2>
        {msg && <div className="notification is-danger">{msg}</div>}
        <Link to='/products/add' className='button is-primary mb-2'>
        Add New Product
      </Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {products.map((product, index)=>(
                <tr key={product.ID}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                    <Link to={`/products/edit/${product.ID}`} className='button is-small is-info mr-2'>
                  Edit
                </Link>
                <button
                  className='button is-small is-danger'
                  onClick={() => deleteUser(product.ID)}
                >
                  Delete
                </button>
                    </td>
                </tr>
              ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default Productlist
