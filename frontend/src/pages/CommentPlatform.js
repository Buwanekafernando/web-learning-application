import React, { useState, useEffect } from 'react';

import Sidebar from "../components/Sidebar";
import CommentBox from "../components/CommentBox";
import LikeDislike from "../components/LikeDislike";

export default function CommentPlatform({ postId, currentUserId }) {

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:8096/api/comments/post/${postId}`);
        if (!res.ok) throw new Error('Failed to fetch comments');
  
        const data = await res.json();
        console.log('Fetched comments data:', data); // Check the response structure here
        setComments(data);
  
      } catch (error) {
        alert('Error fetching comments:', error.message);
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  }, [postId]);
  
  

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
  
    try {
      const response = await fetch('http://localhost:8096/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: commentInput,
          user: {
            user_id: currentUserId,
          },
        }),
      });
  
      if (!response.ok) throw new Error('Failed to add comment');
  
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setCommentInput('');
  
    } catch (error) {
      alert('Error adding comment: ' + error.message);
      console.error('Error adding comment:', error);
    }
  };
  
  

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:8096/api/comments/delete/${commentId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error('Failed to delete comment');
  
      setComments(comments.filter((c) => c.commentId !== commentId));
  
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  const handleUpdate = async (CommentId) => {
    console.log("CommentId:", CommentId); // Debugging line
    if (!commentInput.trim()) return;
  
    try {
      const response = await fetch(
        `http://localhost:8096/api/comments/update/${CommentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: commentInput }),
        }
      );
  
      if (!response.ok) throw new Error("Failed to update comment");
  
      const updatedComment = await response.json();
      setComments(
        comments.map((c) => (c.commentId === updatedComment.commentId ? updatedComment : c))
      );
      setEditingCommentId(null);
      setCommentInput("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };
  
  

  const startEditing = (comment) => {
    setEditingCommentId(comment.commentId);
    setCommentInput(comment.content);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
      <div className="post" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
    <iframe
      src="https://www.youtube.com/embed/72A0NkrSpdo"
      title="YouTube Shorts"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    ></iframe>
  </div>
</div>

        <div className="comments">
  <h3>Comments</h3>
  <LikeDislike postId={postId} userId={currentUserId} />
  <div className="comment-input">
    <input
      type="text"
      value={commentInput}
      onChange={(e) => setCommentInput(e.target.value)}
      placeholder="Add a comment..."
    />
    {editingCommentId ? (
      <button onClick={() => handleUpdate(editingCommentId)}>Update</button>

    ) : (
      <button onClick={handleAddComment}>Post</button>
    )}
  </div>
  <div className="comments-list">
    {comments.length > 0 ? (
      comments.map((comment) => (
     
        <div key={comment.commentId} className="comment-item">
          <div className="comment-avatar">
            <span role="img" aria-label="user">👤</span>
          </div>
          <div className="comment-content">
            <div className="comment-header">
              <span className="comment-author">{comment.userName}</span>
              
              {comment.userId === currentUserId && (
              
                <div className="comment-actions">
                  <button onClick={() => startEditing(comment)}>Edit</button>
                  <button onClick={() => handleDelete(comment.commentId)}>Delete</button>
                </div>
                
              )}
              
             
            </div>
            <p className="comment-text">{comment.content}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No comments yet. Be the first to comment!</p>
    )}
  </div>


</div>


      </div>
    </div>
  );
}
