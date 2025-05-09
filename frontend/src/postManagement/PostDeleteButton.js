import React from 'react';
import { deletePost } from './postService';

const PostDeleteButton = ({ postId, onDeleted }) => {
  const handleDelete = async () => {
    await deletePost(postId);
    onDeleted();
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default PostDeleteButton;
