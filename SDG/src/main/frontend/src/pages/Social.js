import React, { useState, useEffect } from 'react';
import AuthAPI from '../services/AuthAPI.js';
import PostAPI from '../services/PostAPI.js';
import { Helmet } from 'react-helmet';
import profileIcon from '../assets/image/profile.svg';
import { useNavigate } from 'react-router-dom';
import heart from '../assets/SocialAssets/heart.png';
import emptyheart from '../assets/SocialAssets/emptyheart.png';
import post1 from '../assets/SocialAssets/post1.png';
import post2 from '../assets/SocialAssets/post2.png';
import avatar1 from '../assets/SocialAssets/avatar1.png';
import avatar2 from '../assets/SocialAssets/avatar2.png';
import ReactTimeAgo from 'react-time-ago';
import './Social.css';

const Social = () => {
   const [showFields, setShowFields] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [postList, setPostList] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const [likedPosts, setLikedPosts] = useState({});
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

    const handleLikeToggle = (postId) => {
        setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [postId]: !prevLikedPosts[postId],
        }));
    };

    useEffect(() => {
        const fetchPostList = async () => {
            try {
                const response = await PostAPI.listByLike();
                if (!response.data) {
                    throw new Error('Failed to fetch user data');
                }
                setPostList(response.data);
                console.log(response.data);
                setLoading(false);
            }catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
    
        fetchPostList();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div className="socical">
            <Helmet>
                <title>Social</title>
            </Helmet>
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
            {postList.length === 0 ? (
                <div className='no-posts-message'>No posts available. Be the first to create a post!</div>
            ) : (
                postList.map((post, index) => (
                    <div key={index} className='List'>
                        <div className="heart" onClick={() => handleLikeToggle(post.id)}>
                            <img src={likedPosts[post.id] ? heart : emptyheart} alt='heart' />
                        </div>
                        <div className='left'>
                            <img src={index === 0 ? post1 : post2} alt={`post${index + 1}`} />
                        </div>
                        <div className='right'>
                            <div className='top'>
                                <div className='item'>{post.title}</div>
                                <div className='item'>{post.content}</div>
                            </div>
                            <div className='bottom'>
                                <div className='userInfo'>
                                    <div className='avatar'>
                                        <img src={index === 0 ? avatar1 : avatar2} alt='avatar' />
                                    </div>
                                    <div className='user'>
                                        <div className='name'>{post.username}</div>
                                        <div className='time'><ReactTimeAgo date={post.date} locale="en-AU"/></div>
                                    </div>
                                </div>
                                <div className='like'>
                                    <div className='num'>{post.likeCount} likes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Social;