import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

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
  name: string;
  quantity: string;
}

const FormGenerateCode: React.FC = () => {
  const [redeems, setRedeems] = useState<Redeem[]>([]);
  const [redeemedItems, setRedeemedItems] = useState<Redeem[]>([]);
  const [unredeemedItems, setUnredeemedItems] = useState<Redeem[]>([]);
  const [showRedeemed, setShowRedeemed] = useState(true); // Default to showing redeemed items
  const [msg, setMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [newPrizeName, setNewPrizeName] = useState('');
  const [newPrizeQuantity, setNewPrizeQuantity] = useState(0);

  const [prizes, setPrizes] = useState<Prize[]>([]);



  const handleGenerateCode = async () => {
    try {
      const token = sessionStorage.getItem('token');

      const response = await axios.get('http://localhost:8081/api/voucher/generate-code', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const generatedCode = response.data.code;
      // console.log('Generated code:', generatedCode);

      // Tampilkan notifikasi bahwa generate code berhasil beserta kode yang dihasilkan
      toast.success(`Generate code successful: ${generatedCode}`);

    } catch (error: any) {
      console.error('Error:', error.message);

      // Tampilkan notifikasi bahwa terjadi kesalahan saat generate code
      toast.error('Failed to generate code');
    }
  };

  return (
    <div>
      <div className='columns'>
        <div className='column'>
          <h1 className='title'>Generate Code</h1>
          <button className='button is-primary mb-2' onClick={handleGenerateCode}>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormGenerateCode;
