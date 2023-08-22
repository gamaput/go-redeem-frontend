import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { isAdmin } from '../auth/authUtils';

const AdminFeature: React.FC = () => {
  const isAdminUser = useSelector((state: RootState) => state.auth);

  if (!isAdminUser) {
    return <p>Unauthorized access</p>;
  }

  return (
    <div>
      <h2>Admin Page</h2>
      {/* Konten halaman admin */}
    </div>
  );
};

export default AdminFeature;
