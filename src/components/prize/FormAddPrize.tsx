import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Redeem {
    ID: number;
    code: string;
    is_redeemed: boolean;
    name: string;
    no_ktp: string;
    city: string;
    address: string;
    phone_no: string;
    UpdatedAt: string;
    prize_id: number;
}

interface Prize {
    ID: number;
    prize_name: string;
    quantity: string;
}

const FormAddPrize = () => {
    const [newPrizeName, setNewPrizeName] = useState('');
    const [newPrizeQuantity, setNewPrizeQuantity] = useState(0);
    const [msg, setMsg] = useState('');

    const [redeems, setRedeems] = useState<Redeem[]>([]);

    const handleAddPrize = async () => {
        try {
            const token = sessionStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:8081/api/prizes/add',
                {
                    prize_name: newPrizeName,
                    quantity: newPrizeQuantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            // Clear input fields
            setNewPrizeName('');
            setNewPrizeQuantity(0);

            // Tampilkan notifikasi bahwa prize berhasil ditambahkan
            toast.success('Prize added successfully');
        } catch (error: any) {
            console.error('Error:', error.message);
            setMsg(error.response.data.msg)
            // Tampilkan notifikasi bahwa terjadi kesalahan saat menambahkan prize
            toast.error('Failed to add prize');
        }
    };
    return (
        <div>
            <h1 className="title">Prize</h1>
            <h2 className="subtitle">Edit Stok Prize</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        {msg && <div className="notification is-danger">{msg}</div>}
                        <div className="field">
                            <label className="label">Prize Name</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Prize"
                                    value={newPrizeName}
                                    onChange={(e) => setNewPrizeName(e.target.value)}
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
                                    value={newPrizeQuantity}
                                    onChange={(e) => setNewPrizeQuantity(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className='button is-primary mt-2' onClick={handleAddPrize}>
                                    Submit Hadiah
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default FormAddPrize
