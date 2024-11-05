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
import Popup from'../components/Popup.js';
import Tooltip from '../components/Tooltip.js';
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
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [placeholder, setPlaceholder] = useState("Let's share what going on your mind...");
    const navigate = useNavigate();

    const handleInputClick = () => {
        setPlaceholder("Title");
        setShowFields(true);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCloseField = () => {
        setPlaceholder("Let's share what going on your mind...");
        setShowFields(false);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleMyPost = () => {
        navigate(`/social/post`);
    };

    const handleCreatePost = async () => {
        if(!title || !content){
            setPopupMessage("Don’t forget to add both a title and content to share your thoughts!");
            setIsPopupVisible(true);
            return;
        }

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
                    setPopupMessage("Your post has been successfully created!");
                    setIsPopupVisible(true);
                    navigate(`/social/post`);
                } else {
                    setPopupMessage("Oops! Something went wrong. Please try saving your post again.");
                    setIsPopupVisible(true);
                }
            }
        }catch (error) {
            console.log(error);
            setPopupMessage("An error occurred while creating the post. Please try again later.");
            setIsPopupVisible(true);
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
        <div>
            <Helmet>Social</Helmet>
            <Popup                
                message={popupMessage} 
                isVisible={isPopupVisible} 
                onClose={() => setIsPopupVisible(false)} 
            />
            <div className="socical">
                <div className='navSearch'>
                    <div className='item'>           
                        <Tooltip text="Click here to edit your post.">
                            <img className='my-post' src={profileIcon} alt='profile' onClick ={handleMyPost} />
                        </Tooltip>
                    </div>
                    <div className='item'>
                        <input
                            className='inputBox'
                            type="text"
                            placeholder={placeholder}
                            value={title}
                            onClick={handleInputClick}
                            onChange={handleTitleChange}
                        />
                        {showFields && (
                            <div>
                                <input
                                    className='inputBox2'
                                    type="text"
                                    placeholder="Content"
                                    value={content}
                                    onChange={handleContentChange}
                                />
                                <div className='x-btn'>
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
        </div>
    );
};

export default Social;