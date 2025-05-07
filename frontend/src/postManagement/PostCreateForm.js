import React, { useState } from 'react';
import { createPost } from './postService';
import { useNavigate } from 'react-router-dom';

const PostCreateForm = () => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // Hardcoded userId, you can change this logic
    const newPost = await createPost(userId, caption, imageUrl);
    if (newPost) {
      navigate('/posts');
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreateForm;
