import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  userID: String,
  name: String
}

const Profile: React.FC<{ userID: string }> = ({ userID }) => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get<User>(`http://localhost:8081/api/users/${userID}`,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [userID]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      {/* Tampilkan informasi pengguna lainnya */}
    </div>
  );
};

export default Profile;
