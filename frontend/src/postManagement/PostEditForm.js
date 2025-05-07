import React, { useState, useEffect } from 'react';
import { getPost, updatePost } from './postService';
import { useNavigate, useParams } from 'react-router-dom';

const PostEditForm = () => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(postId);
      if (post) {
        setCaption(post.caption);
        setImageUrl(post.imageUrl);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = await updatePost(postId, caption);
    if (updatedPost) {
      navigate('/posts');
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Caption:</label>
        <input 
          type="text" 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
        />
        <label>Image URL:</label>
        <input 
          type="text" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default PostEditForm;
