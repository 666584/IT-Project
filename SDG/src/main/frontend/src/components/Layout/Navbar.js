import React, { useState } from 'react';
import SearchBar from './SearchBar.js';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../services/AuthAPI.js';

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
                <span className='icon'>
                    <button onClick={handleProfileClick}>
                        <img src={require('../../assets/user.png')} alt='module' />
                    </button>
                </span>
                <span className='icon'>
                <button>
                    <img src={require('../../assets/setting.png')} alt='module' /></button>
                 </span>
            </div>
        </div>
    );
}

export default Navbar;