import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';
import editIcon from '../assets/ProfilePage/edit.png';
import sdgLogo from '../assets/ProfilePage/sdg-logo.png';
import profileImage from '../assets/ProfilePage/profile.svg';

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
                const response = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);
                if (!response.data) {
                    throw new Error('Failed to fetch user data');
                }
                setUser(response.data);
                setNewData(response.data); // Set initial data for editing
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
        try {
            // Add your API update logic here
            await axios.put(`http://localhost:8080/api/auth/user/${params.userId}`, newData);
            setUser(newData);
            setIsEditing(false);
        } catch (error) {
            setError('Failed to update user data');
        }
    };

    const handleEditProfilePicture = () => {
        // Add logic for changing profile picture
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
                            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                        </div>
                        <div className="profile-fields">
                            <label>Full Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="fullName"
                                    value={newData.fullName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                // <span>{user.fullName}</span> Users Name
                                <span>Aryan Saini</span>
                            )}
                            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                        </div>
                        <div className="profile-fields">
                            <label>Email:</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={newData.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{user.email}</span>
                            )}
                            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                        </div>
                        <div className="profile-fields">
                            <label>ID Type:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="idType"
                                    value={newData.idType}
                                    onChange={handleInputChange}
                                />
                            ) : (<span>User</span>

                                // <span>{user.idType}</span> The id type remains User
                            )}
                            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
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
