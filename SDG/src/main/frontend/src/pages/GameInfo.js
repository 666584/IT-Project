import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar.js';
import { Helmet } from 'react-helmet';
import './GameInfo.css';

const Games = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="games">
            <Helmet>
                <title>Game Instruction</title>
            </Helmet>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Navbar>
            <div className='text'>
                <div className='textItem'>
                    <div className='header'>
                        Instructions
                    </div>
                    <div className='content'>
                        Collect all the glowing orbs scattered across the enchanted forest before the moon sets to unlock the portal to the next realm.
                    </div>
                </div>
                <div className='textItem'>
                    <img src={require('../assets/image-05.png')} alt='games' />
                </div>
            </div>
            <div className='bgImg'>
                <img src={require('../assets/game.png')} alt='games' />
            </div>
        </div>

    )
}

export default Games