import React, { useEffect, useState, SyntheticEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormEditProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0.0);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<string>();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://localhost:8081/api/products/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
      } catch (error: any) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      await axios.patch(
        `http://localhost:8081/api/products/${id}`,
        {
          name: name,
          description: description,
          price: price,
          quantity: quantity,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      navigate('/products');
    } catch (error: any) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              {msg && <div className="notification is-danger">{msg}</div>}
              <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    step="0.01"
                    className="input"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Quantity</label>
                <div className="control">
                  <input
                    type="text"
                    step="1"
                    className="input"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-success">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
