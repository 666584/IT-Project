import React, { useState } from 'react';
import Navbar from './Layout/Navbar.js';
import AuthAPI from './services/AuthAPI.js';
import PostAPI from './services/PostAPI.js';
import './Social.css';
import { Helmet } from 'react-helmet';
import profileIcon from '../assets/profile.svg';
import { useNavigate } from 'react-router-dom';

const Social = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFields, setShowFields] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const handleContentClick = () => {
        setShowFields(true);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCloseField = () => {
        setShowFields(false);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCreatePost = async () => {
        try {
            const res = await AuthAPI.auth({ accessToken });
            const userid = res.data;
            if(content != null && title != null && userid != null){
                const postData = {
                    title,
                    userid,
                    content,
                    date: new Date().toISOString(),
                };
                const response = await PostAPI.create(postData);
                if(response.data != null){
                    alert("Post saved.");
                    navigate(`/social/post/${userid}`);
                } else {
                    alert("Post wasn't saved. Try it again.");
                }
            }
        }catch (error) {
            console.log(error);
        }
    }
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
                    <img src={profileIcon} alt='profile' />
                </div>
                <div className='item'>
                    <input
                        className='inputBox'
                        type="text"
                        placeholder="Let's share what going on your mind..."
                        value={content}
                        onClick={handleContentClick}
                        onChange={handleContentChange}
                    />
                    {showFields && (
                        <div>
                            <input
                                className='inputBox'
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                            <div>
                                <button onClick={handleCloseField}>
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <button className='item' onClick={handleCreatePost}>
                    Create Post
                </button>
            </div>
            <div className='List'>
            <div className="heart">
                    <img src={require('../assets/s06.png')} alt='heart' />
                </div>
                <div className='left'>
                    <img src={require('../assets/s01.png')} alt='left' />
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
                                <img src={require('../assets/s03.png')} alt='avatar' />
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
                    <img src={require('../assets/s05.png')} alt='heart' />
                </div>
                <div className='left'>
                    <img src={require('../assets/s02.png')} alt='left' />
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
                                <img src={require('../assets/s04.png')} alt='avatar' />
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