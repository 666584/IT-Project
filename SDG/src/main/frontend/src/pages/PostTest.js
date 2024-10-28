import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PostAPI from '../services/PostAPI'

const PostTest = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postList, setPostList] = useState([]);   
    const params  = useParams();
    const [editingPost, setEditingPost] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const userId = params.userId;

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

    const handleDelete = async (deletePostId) =>  {
        try {
            const postData = { postId: deletePostId };
            const response = await PostAPI.delete(postData);
            if(response.data != null){
                window.location.reload();
                alert("Post deleted.");
            } else {
                alert("Post wasn't deleted. Try it again.");
            }
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
                    alert("Post updated.");
                } else {
                    alert("Post wasn't updated. Try it again.");
                }
            }
        }catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchPostList = async () => {
            console.log(params.userId);
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
            <ul>
                {postList.map((post, index) => (
                <li key={post.postId}>
                    <div>
                        {index + 1}.{post.title}: {post.content}: {post.date}: {post.likeCount}
                    </div>
                    <button onClick={() => handleEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post.postId)}>Delete</button>
                </li>
                ))}
            </ul>
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Edit Post</h3>
                        <textarea
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="popup-buttons">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostTest