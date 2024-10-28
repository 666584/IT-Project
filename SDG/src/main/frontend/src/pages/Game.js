import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar.js';
import { Helmet } from 'react-helmet';

const Games = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div>
            <Helmet>
                <title>Games</title>
            </Helmet>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Navbar>
        </div>

    )
}

export default Games