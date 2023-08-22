import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const FormRedeemCode: React.FC = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [no_ktp, setNo_ktp] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const navigate = useNavigate();

  const handleRedeemCode = async () => {
    // Validasi input tidak boleh kosong
    if (code === '' || name === '' || no_ktp === '' || city === '' || address === '' || phone_no === '') {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8081/api/redeem',
        {
          code: code,
          name: name,
          no_ktp: no_ktp,
          city: city,
          address: address,
          phone_no: phone_no,
        },
        {
          withCredentials: true,
        }
      );

      // console.log(response.data);

      // Tampilkan notifikasi bahwa generate code berhasil
      if (response.data.prize && response.data.prize.ID !== 0) {
        toast.success(`Selamat !! Anda mendapatkan hadiah ${response.data.prize.name}`)
      } else if (response.data.prize && response.data.prize.ID === 0) {
        toast.error("Anda kurang beruntung !!")
      }

      // } else {
      //   toast.success('Redeem code successful');
      // }
      setCode('')
      setName('');
      setNo_ktp('');
      setCity('');
      setAddress('');
      setPhone_no('');
    } catch (error: any) {
      console.error('Error:', error.message);

      if (error.response && error.response.status === 400 && error.response.data.error === 'Redeem code has already been redeemed') {
        toast.error('Anda kurang beruntung !!');
      } else {
        toast.error('Anda kurang beruntung !!');
      }
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title">Redeem Code</h1>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div className="field">
                  <label className="label">Code Voucher</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Code Voucher"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Nama Lengkap</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Nama Lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Nomor KTP</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Nomor KTP"
                      value={no_ktp}
                      onChange={(e) => setNo_ktp(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Kota</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Kota"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Alamat Lengkap</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Alamat Lengkap"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Nomor HP</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Nomor HP"
                      value={phone_no}
                      onChange={(e) => setPhone_no(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-success" onClick={handleRedeemCode}>
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRedeemCode;
