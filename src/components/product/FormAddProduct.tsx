import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
}

const FormAddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0.0);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
   
        try {
            // Kirim data pengguna baru ke backend
            const newProduct: Product = { name, description, price, quantity };
            const token = sessionStorage.getItem('token');
            const response = await axios.post<Product>('http://localhost:8081/api/products/add', newProduct, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
    
            // Reset nilai-nilai input setelah berhasil menambahkan pengguna
            setName('');
            setDescription('');
            setPrice(0.0);
            setQuantity(0);
            
            console.log('Product added successfully', response.data);
            navigate("/products")
        } catch (error: any) {
            console.log('Error adding user', error);
            setMsg(error.response.data.msg);
        }
    };
  return (
    <div>
      <h1 className='title'>Products</h1>
            <h2 className='subtitle'>Add New Product</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleSubmit}>
                        {msg && <div className="notification is-danger">{msg}</div>}
                            <div className="field">
                                <label className='label'>Product</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className='label'>Description</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className='label'>Price</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Price' value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className='label'>Quantity</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>
                                </div>
                            </div>
                                                       
                            <div className="field">
                                <div className="control">
                                    <button className='button is-success'>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default FormAddProduct
