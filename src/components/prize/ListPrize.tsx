import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

interface Prize {
    ID: number;
    name: string;
    quantity: string;
}

const ListPrize = () => {
    const [prizes, setPrizes] = useState<Prize[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getCurrentItems = () => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        return prizes.slice(startIdx, endIdx);
    };

    const totalPages = Math.ceil(prizes.length / itemsPerPage);

    useEffect(() => {
        getPrizes();
    }, []);

    const getPrizes = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get('http://localhost:8081/api/prizes/', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,

            })
            // console.log(response.data)
            setPrizes(response.data)
        } catch (error: any) {
            console.log(error)
        }
    };
    const handleDeletePrize = async (id: number) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this user?");
            if (confirmDelete) {
                const token = sessionStorage.getItem('token');
                await axios.delete(`http://localhost:8081/api/prizes/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                getPrizes();
            }
        } catch (error: any) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1 className='title'>Prizes</h1>
            <h2 className='subtitle'>List of Prizes</h2>
            <Link to='/prizes/add' className='button is-primary mb-2'>
                Add New Prize
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {prizes.map((prize) => (
                        <tr key={prize.ID}>
                            <td>{prize.ID}</td>
                            <td>{prize.name}</td>
                            <td>{prize.quantity}</td>
                            <td>
                                <Link to={`/prizes/edit/${prize.ID}`} className='button is-small is-info mr-2'>
                                    Edit
                                </Link>
                                <button
                                    className='button is-danger is-small'
                                    onClick={() => handleDeletePrize(prize.ID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className='pagination' role='navigation'>
                <button
                    className='pagination-previous'
                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className='pagination-next'
                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <ul className='pagination-list'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page}>
                            <button
                                className={`pagination-link ${page === currentPage ? 'is-current' : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default ListPrize
