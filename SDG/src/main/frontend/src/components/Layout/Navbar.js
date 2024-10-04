import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../../AuthAPI';

function Navbar({searchTerm, setSearchTerm}) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleProfileClick = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');                  
        try {
            const response = await AuthAPI.auth({ accessToken });            
            navigate(`/user/${response.data}`);    
        }catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="search">
            <div className="searchItem">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="searchItem">
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