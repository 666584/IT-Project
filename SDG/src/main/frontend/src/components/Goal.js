import React, { useState } from 'react';
import SearchBar from './Layout/SearchBar';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import './Goal.scss';

const Goal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const params  = useParams();
    console.log("data" + params.title);
    
    return (
        <div className="goal">
            <Helmet>
                <title>{params.title}</title>
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
            <div className="education">
                <div className="educationItem">
                    <div className='header'>{params.title}</div>
                    <div className='content'>
                        <div className='contentItem'>
                            <div className='contentItemLeft'>Overview</div>
                            <div className='contentItemRight'>/50</div>
                        </div>
                        <div className='contentItem'>
                            <div className='contentItemLeft'>Targets and Indicators</div>
                            <div className='contentItemRight'>/50</div>
                        </div>
                        <div className='contentItem'>
                            <div className='contentItemLeft'>Progress</div>
                            <div className='contentItemRight'>/50</div>
                        </div>
                    </div>
                </div>
                <div className="educationItem">
                    <img src={require('../assets/image-4.png')} alt='module' />
                </div>
            </div>
            <div className="recent">
                <div className="recentItem">
                    <div className='header'>Recent Publications</div>
                    <div className='imgContain'>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-one.png')} alt='module' />
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-1.png')} alt='module' />
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-2.png')} alt='module' />
                        </div>
                        <div className='imgContainItem'>
                            <img src={require('../assets/image-3.png')} alt='module' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Goal