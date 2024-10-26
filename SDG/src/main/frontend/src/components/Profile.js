import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params  = useParams();

    useEffect(() => {
    const fetchUserData = async () => {
        console.log(params.userId);
        const userId = params.userId;
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);
            if (!response.data) {
                throw new Error('Failed to fetch user data');
            }
            setUser(response.data);
            setLoading(false);
        }catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Profile Page</h1>
      <div style={styles.profileBox}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>      
        <h2>{user.firstName} {user.lastName}</h2>
      </div>
    </div>
  );
}

// 간단한 스타일링
const styles = {
  container: {
    width: '50%',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
  },
  profileBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  }
};

export default Profile;