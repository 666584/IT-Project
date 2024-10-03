import React, { useState } from 'react';
import SearchBar from './Layout/SearchBar';
import './Games.css';
import { Helmet } from 'react-helmet';

const Games = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="games">
            <Helmet>
                <title>Games</title>
            </Helmet>
            <div className="search">
                <div className="searchItem">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className="searchItem">
                <span className='icon'>
                        <img src={require('../assets/user.png')} alt='module' />
                    </span>
                    <span className='icon'>
                        <img src={require('../assets/setting.png')} alt='module' />
                    </span>
                </div>
            </div>
            <div className='text'>
                <div className='textItem'>
                    <div className='header'>
                        instructions
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