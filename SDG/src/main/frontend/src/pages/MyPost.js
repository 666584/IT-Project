import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PostAPI from '../services/PostAPI.js';
import AuthAPI from '../services/AuthAPI.js';
import DeletePopup from'../components/MyPostComponents/DeletePopup.js';
import Popup from'../components/Popup.js';
import './MyPost.css';

const MyPost = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postList, setPostList] = useState([]);   
    const [editingPost, setEditingPost] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
    const [deletePopupMessage, setDeletePopupMessage] = useState('');
    const [deletePostId, setDeletePostId] = useState(null);

    const handleEdit = (post) => {
        setEditingPost(post);
        setEditedContent(post.content);
        setEditedTitle(post.title);
        setIsPopupOpen(true); 
    }

    const handleSave = () => {
        setEditingPost(null);
        handleUpdatePost();
        setIsPopupOpen(false);
    }

    const handleCheckDelte = (deletePostId) => {
        setDeletePostId(deletePostId); 
        setDeletePopupMessage("REALLY?");
        setIsDeletePopupVisible(true);
    }
    const handleDelete = async () =>  {
        setIsDeletePopupVisible(false);
        setDeletePostId(null);
        try {
            const postData = { postId: deletePostId };
            const response = await PostAPI.delete(postData);
            if(response.data != null){
                window.location.reload();
                setPopupMessage("Post deleted.");
            } else {
                setPopupMessage("Post wasn't deleted. Try it again.");
            }
            setIsPopupVisible(true);
        }catch (error) {
            console.log(error);
        }
    }

    const handleUpdatePost = async () => {
        try {
            if(editedTitle !== null && editedContent !== null && editingPost.postId !== null){
                const postData = {
                    postId: editingPost.postId,
                    title: editedTitle,
                    content: editedContent,
                };
                const response = await PostAPI.update(postData);
                if(response.data != null){
                    window.location.reload();
                    setPopupMessage("Post updated.");
                } else {
                    setPopupMessage("Post wasn't updated. Try it again.");
                }
                setIsPopupVisible(true);
            }
        }catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-AU', options);
    };

    useEffect(() => {
        const fetchPostList = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const res = await AuthAPI.auth({ accessToken });
            const userId = res.data;
            try {
                const response = await PostAPI.listByUser(userId);
                if (!response.data) {
                    throw new Error('Failed to fetch post list.');
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
            <Helmet>My Post</Helmet>
            <DeletePopup                
                message={deletePopupMessage} 
                isVisible={isDeletePopupVisible} 
                onClose={() => setIsDeletePopupVisible(false)} 
                onDelete={handleDelete}
            />
            <Popup                
                message={popupMessage} 
                isVisible={isPopupVisible} 
                onClose={() => setIsPopupVisible(false)} 
            />
            <div className='mypost-header'>
                <h2>My Post</h2>
            </div>
            <div>
                {postList.map((post, index) => (
                <div key={post.postId} className='mypost'>
                    <h2>{post.title}</h2>
                    <div className='mypost-content'>{post.content}</div>
                    <div className="mypost-info">
                        <span className="mypost-date">{formatDate(post.date)}</span>
                        <span className="mypost-likes">{post.likeCount} Likes</span>
                    </div>
                    <div className="mypost-button-container">
                        <button className='mypost-btn' onClick={() => handleEdit(post)}>Edit</button>
                        <button className='mypost-btn' onClick={() => handleCheckDelte(post.postId)}>Delete</button>
                    </div>
                </div>
                ))}
            </div>
            {isPopupOpen && (
                <div className="mypost-popup-overlay">
                    <div className="mypost-popup-edit">
                        <h3>Edit Post</h3>
                        <textarea
                            className="mypost-popup-title"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <textarea
                            className="mypost-popup-content"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="mypost-popup-buttons">
                            <button className="mypost-popup-btn" onClick={handleSave}>Save</button>
                            <button className="mypost-popup-btn" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyPost