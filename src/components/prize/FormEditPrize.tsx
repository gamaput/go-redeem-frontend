import React, { useEffect, useState, SyntheticEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormEditPrize = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0.0);
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const getPrizeById = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:8081/api/prizes/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true,
                });
                setName(response.data.name);
                setQuantity(response.data.quantity);
            } catch (error: any) {
                if (error.response)
                    setMsg(error.response.data.msg)
            }
        };
        getPrizeById();
    }, [id]);

    const updatePrize = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const token = sessionStorage.getItem('token');
            await axios.patch(`http://localhost:8081/api/prizes/${id}`, {
                name: name,
                quantity: quantity,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
            setName('')
            setQuantity(0.0)
            toast.success(`Update Prize successful Name : (${name}) Quantity : (${quantity})`);
            // navigate("/")
            // setName('');
            // setQuantity(0.0)
        } catch (error: any) {
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    };

    return (
        <div>
            <h1 className="title">Prize</h1>
            <h2 className="subtitle">Edit Stok Prize</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updatePrize}>
                            {msg && <div className="notification is-danger">{msg}</div>}
                            <div className="field">
                                <label className="label">Prize Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Prize"
                                        value={name}
                                        readOnly
                                        style={{ cursor: 'not-allowed' }}
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
    )
}

export default FormEditPrize
