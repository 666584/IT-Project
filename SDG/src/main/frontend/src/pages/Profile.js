import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';
import editIcon from '../assets/ProfilePage/edit.png';
import sdgLogo from '../assets/ProfilePage/sdg-logo.png';
import profileImage from '../assets/ProfilePage/profile.svg';
import AuthAPI from '../services/AuthAPI.js';
function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newData, setNewData] = useState({});
    const params = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = params.userId;
            try {
                const response = await AuthAPI.userInfo(userId);
                if (!response.data) {
                    throw new Error('Failed to fetch user data');
                }
                setUser(response.data);
                setNewData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [params.userId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleSaveClick = async () => {
      setNewData({ ...newData, email: user.email });   
      try {
        const res = await AuthAPI.update(newData);            
        if(res.data){
          window.location.reload();
          setIsEditing(false); 
        }
      } catch (error) {
        setError('Failed to update user data');
      }
    };

    const handleEditProfilePicture = () => {
        alert('Change profile picture functionality coming soon!');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="header-background">
                        <h2>PROFILE ID CARD</h2>
                    </div>
                    <button className="edit-btn" onClick={handleEditClick}>
                        <img src={editIcon} alt="Edit Profile" />
                    </button>
                </div>
                <div className="profile-content">
                    <div className="profile-info">
                        <div className="profile-fields">
                            <label>Username:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={newData.username}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{user.username}</span>
                            )}
                        </div>
                        <div className="profile-fields">
                            <label>First Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstname"
                                    value={newData.firstname}
                                    onChange={handleInputChange}
                                />
                            ) : (
                              <span>{user.firstname}</span>
                            )}
                        </div>
                        <div className="profile-fields">
                            <label>Last Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="lastname"
                                    value={newData.lastname}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{user.lastname}</span>
                            )}

                        </div>
                        <div className="profile-fields">
                            <label>Email:</label>
                              <span>{user.email}</span>
                        </div>
                    </div>
                    <div className="profile-image-section">
                        <img src={profileImage} alt="Profile" className="profile-image" />
                        <button className="edit-img-btn" onClick={handleEditProfilePicture}>
                            <img src={editIcon} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profile-footer">
                    <img src={sdgLogo} alt="SDG Learning HUB" className="sdg-logo" />
                    <span className='auth-font'>Authorized by </span> <span className='sdghub-font'> SDG Learning HUB</span>
                </div>
                {isEditing && (
                    <button className="save-btn" onClick={handleSaveClick}>
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
