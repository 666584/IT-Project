import React, { useState } from 'react';
import SearchBar from './SearchBar.js';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../services/AuthAPI.js';
import './Navbar.css';

function Navbar({searchTerm, setSearchTerm}) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleProfileClick = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');                  
        try {
            const response = await AuthAPI.auth({ accessToken });            
            navigate(`/profile/${response.data}`);    
        }catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="search">
            <div className="searchItem">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <button className="icon">
                    <img src={require('../../assets/setting.png')} alt='module' />
                </button>
            </div>
        </div>
    );
}

export default Navbar;