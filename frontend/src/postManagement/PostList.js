import React, { useEffect, useState } from 'react';
import { getAllPosts } from './postService';
import { Link } from 'react-router-dom';
import PostDeleteButton from './PostDeleteButton';
import './postManagement.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const data = await getAllPosts();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      <Link to="/posts/new">Create New Post</Link>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <img src={post.imageUrl} alt="Post" />
          <p>{post.caption}</p>
          <div className="post-actions">
            <Link to={`/posts/edit/${post.id}`}>Edit</Link>
            <PostDeleteButton postId={post.id} onDeleted={loadPosts} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
