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
            const response = await axios.get(`https://localhost:443/api/auth/user/${userId}`);
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
    <div className="container">
      <h1>Profile Page</h1>
      <div className="profileBox">
        <p><strong>Username:</strong>  <button onClick={() => handleEdit(post)}>Edit</button>{user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>      
        <h2>{user.firstName} {user.lastName}</h2>
      </div>
    </div>
  );
}

export default Profile;