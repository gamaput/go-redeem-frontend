import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from 'react-csv';
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

const Redeemlist = () => {
  const [redeems, setRedeems] = useState<Redeem[]>([]);
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
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setRedeems(response.data);
      // console.log(response.data)
    } catch (error: any) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  // Filter the redeemed items
  const sortedRedeems = redeems.sort((a: Redeem, b: Redeem) => {
    // Sort by updated_at in ascending
    const dateA = new Date(a.UpdatedAt).getTime();
    const dateB = new Date(b.UpdatedAt).getTime();
    return dateB - dateA;
  });
  const redeemedItems = sortedRedeems.filter((redeem) => redeem.is_redeemed);

  // Function to convert Redeemlist data to CSV format
  const convertToCSV = () => {
    const csvData = redeemedItems.map((redeem) => ({
      ID: redeem.ID,
      code: redeem.code,
      is_redeemed: redeem.is_redeemed ? 'redeemed' : 'not redeemed',
      UpdateAt: formatDate(redeem.UpdatedAt),
      name: redeem.name,
      no_ktp: redeem.no_ktp,
      city: redeem.city,
      address: redeem.address,
      phone_no: redeem.phone_no,
      prize_id: redeem.prize_id,
    }));

    return csvData;
  };

  const getCurrentItems = () => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return redeemedItems.slice(startIdx, endIdx);
  };

  const totalPages = Math.ceil(redeemedItems.length / itemsPerPage)

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
      <h1 className='title'>Redeems</h1>
      <h2 className='subtitle'>List of Redeems</h2>

      <div className='buttons'>
        {msg && <div className="notification is-danger">{msg}</div>}
        <Link to='/redeem-code' className='button is-primary mb-2' target="_blank">
          Redeem Code
        </Link>
        <button className='button is-info' onClick={getRedeems}>
                    <span className='icon'>
                        <IoRefreshSharp />
                    </span>
                </button>
        <CSVLink
          data={convertToCSV()}
          filename={"redeemlist.csv"}
          className="button is-link ml-auto"
          target="_blank"
        >
          Download CSV
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
                <td>{index + 1}</td>
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

export default Redeemlist;
