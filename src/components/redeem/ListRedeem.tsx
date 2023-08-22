import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';
import { IoRefreshSharp } from "react-icons/io5"

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

const ListRedeem = () => {
    const [redeems, setRedeems] = useState<Redeem[]>([]);
    const [redeemedItems, setRedeemedItems] = useState<Redeem[]>([]);
    const [unredeemedItems, setUnredeemedItems] = useState<Redeem[]>([]);
    const [showRedeemed, setShowRedeemed] = useState(true); // Default to showing redeemed items
    const [msg, setMsg] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        getRedeems();
    }, []);

    const getRedeems = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get('http://localhost:8081/api/voucher/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            // console.log(response.data.prize)
            setRedeems(response.data);

            // toast.success('Data has been updated.');
        } catch (error: any) {
            console.log(error);
            toast.error(error)
        }
    };

    useEffect(() => {
        // Filter and sort the redeemed and unredeemed items separately
        const sortedRedeems = redeems.sort((a: Redeem, b: Redeem) => {
            // Sort by updated_at in ascending
            const dateA = new Date(a.UpdatedAt).getTime();
            const dateB = new Date(b.UpdatedAt).getTime();
            return dateB - dateA;
        });

        const redeemed = sortedRedeems.filter((redeem) => redeem.is_redeemed);
        setRedeemedItems(redeemed);

        const unredeemed = sortedRedeems.filter((redeem) => !redeem.is_redeemed);
        setUnredeemedItems(unredeemed);
    }, [redeems]);

    const convertAllToCSV = () => {
        const allData = [...redeemedItems, ...unredeemedItems].map((redeem) => ({
            ID: redeem.ID,
            code: redeem.code,
            is_redeemed: redeem.is_redeemed ? 'redeemed' : 'not redeemed',
            name: redeem.name,
            no_ktp: redeem.no_ktp,
            city: redeem.city,
            address: redeem.address,
            phone_no: redeem.phone_no,
            prize_id: redeem.prize_id,
        }));

        return allData;
    };

    const convertRedeemedToCSV = () => {
        const redeemedData = redeemedItems.map((redeem) => ({
            ID: redeem.ID,
            code: redeem.code,
            is_redeemed: 'redeemed',
            UpdateAt: formatDate(redeem.UpdatedAt),
            name: redeem.name,
            no_ktp: redeem.no_ktp,
            city: redeem.city,
            address: redeem.address,
            phone_no: redeem.phone_no,
            prize_id: redeem.prize_id
        }));

        return redeemedData;
    };

    const convertUnredeemedToCSV = () => {
        const unredeemedData = unredeemedItems.map((redeem) => ({
            ID: redeem.ID,
            code: redeem.code,
            is_redeemed: 'not redeemed',
            name: redeem.name,
            no_ktp: redeem.no_ktp,
            city: redeem.city,
            address: redeem.address,
            phone_no: redeem.phone_no,
            prize_id: redeem.prize_id,
        }));

        return unredeemedData;
    };
    const getCurrentItems = () => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        return showRedeemed ? redeemedItems.slice(startIdx, endIdx) : unredeemedItems.slice(startIdx, endIdx);
    };

    const totalPages = Math.ceil((showRedeemed ? redeemedItems.length : unredeemedItems.length) / itemsPerPage);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    return (
        <div>
            <h2 className='title'>List of Redeems</h2>
            <div className='buttons'>
                <button className={`button ${showRedeemed ? 'is-primary is-light' : ''}`} onClick={() => setShowRedeemed(true)}>Redeemed</button>
                <button className={`button ${!showRedeemed ? 'is-primary is-light' : ''}`} onClick={() => setShowRedeemed(false)}>Unredeemed</button>
                {/* Add the CSVLink for downloading the combined CSV */}
                {/* <CSVLink
                    data={convertAllToCSV()}
                    filename={"redeemlist_all.csv"}
                    className="button is-link ml-auto" // Use "ml-auto" class to align the button to the right
                    target="_blank"
                >
                    Download All CSV
                </CSVLink> */}
                <button className='button is-info' onClick={getRedeems}>
                    <span className='icon'>
                        <IoRefreshSharp />
                    </span>
                </button>
                <CSVLink
                    data={showRedeemed ? convertRedeemedToCSV() : convertUnredeemedToCSV()}
                    filename={`redeemlist_${showRedeemed ? 'redeemed' : 'unredeemed'}.csv`}
                    className='button is-link ml-auto'
                    target='_blank'
                >
                    Download {showRedeemed ? 'Redeemed' : 'Unredeemed'} CSV
                </CSVLink>
            </div>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Code Voucher</th>
                        <th>Status</th>
                        <th>Redeem Date</th>
                        <th>Name</th>
                        <th>No KTP</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>No HP</th>
                        <th>Prize</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {getCurrentItems().map((redeem, index) => {
                        const status = redeem.is_redeemed ? 'redeemed' : 'not redeemed';
                        let prizeName = '';

                        if (redeem.prize_id === 1) {
                            prizeName = 'Pulsa 100.000';
                        } else if (redeem.prize_id === 2) {
                            prizeName = 'Pulsa 5.000';
                        } else if (redeem.prize_id === 3) {
                            prizeName = 'Pulsa 20.000';
                        } else if (redeem.prize_id === 4) {
                            prizeName = 'Pulsa 5000';
                        } else if (redeem.prize_id === 5) {
                            prizeName = 'Pulsa 50.000';
                        } else if (redeem.prize_id === 7) {
                            prizeName = 'Voucher Belanja 100.000';
                        } else if (redeem.prize_id === 0 && redeem.is_redeemed) {
                            prizeName = 'Anda kurang beruntung !!';
                        }

                        return (
                            <tr key={redeem.ID}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{redeem.code}</td>
                                <td>{status}</td>
                                {redeem.is_redeemed ? (
                                    <td>{formatDate(redeem.UpdatedAt)}</td>
                                ) : (
                                    <td></td>
                                )}
                                <td>{redeem.name}</td>
                                <td>{redeem.no_ktp}</td>
                                <td>{redeem.city}</td>
                                <td>{redeem.address}</td>
                                <td>{redeem.phone_no}</td>
                                <td>{prizeName}</td>
                                
                            </tr>
                        );
                    })}

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

export default ListRedeem
