import React, { useState } from 'react';
import Navbar from './Layout/Navbar';
import './Social.css';
import { Helmet } from 'react-helmet';
const Social = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="socical">
            <Helmet>
                <title>Social</title>
            </Helmet>
            <div className="searchItem">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Navbar>
            </div>
            <div className='navSearch'>
                <div className='item'>
                    <img src={require('../assets/s03.png')} alt='module' />
                </div>
                <div className='item'>
                    <input
                        className='inputBox'
                        type="text"
                        placeholder="Let's share what going on your mind..."
                        value=''
                    />
                </div>
                <div className='item'>
                    Create Post
                </div>
            </div>
            <div className='List'>
            <div className="heart">
                    <img src={require('../assets/s06.png')} alt='module' />
                </div>
                <div className='left'>
                    <img src={require('../assets/s01.png')} alt='module' />
                </div>
                <div className='right'>
                    <div className='top'>
                        <div className='item'>
                            Sustainable Business Practices: Promoting fair trade and inclusive  Sustainable Business Practices
                        </div>
                        <div className='item'>
                            <div className='tab'>design</div>
                            <div className='tab'>user iterface</div>
                            <div className='tab'>designing</div>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='userInfo'>
                            <div className='avatar'>
                                <img src={require('../assets/s03.png')} alt='module' />
                            </div>
                            <div className='user'>
                                <div className='name'>Michal Malewicz o</div>
                                <div className='time'>2 weeks ago</div>
                            </div>
                        </div>
                        <div className='like'>
                            <div className='num'>964,258 Views</div>
                            <div className='num'>64,755 Likes</div>
                            <div className='num'>44 comments</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='List'>
                <div className="heart">
                    <img src={require('../assets/s05.png')} alt='module' />
                </div>
                <div className='left'>
                    <img src={require('../assets/s02.png')} alt='module' />
                </div>
                <div className='right'>
                    <div className='top'>
                        <div className='item'>
                            Sustainable Business Practices: Promoting fair trade and inclusive  Sustainable Business Practices
                        </div>
                        <div className='item'>
                            <div className='tab'>design</div>
                            <div className='tab'>user iterface</div>
                            <div className='tab'>designing</div>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='userInfo'>
                            <div className='avatar'>
                                <img src={require('../assets/s04.png')} alt='module' />
                            </div>
                            <div className='user'>
                                <div className='name'>Michal Malewicz o</div>
                                <div className='time'>2 weeks ago</div>
                            </div>
                        </div>
                        <div className='like'>
                            <div className='num'>964,258 Views</div>
                            <div className='num'>64,755 Likes</div>
                            <div className='num'>44 comments</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social