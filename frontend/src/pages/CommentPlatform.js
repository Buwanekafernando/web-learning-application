import React, { useState, useEffect } from 'react';

import Sidebar from "../components/Sidebar";
import CommentBox from "../components/CommentBox";

export default function CommentPlatform({ postId, currentUserId }) {

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:8096/api/comments/post/${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error('Error fetching comments:', err));
  }, [postId]);


  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    const response = await fetch('http://localhost:8096/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId,
        userId: currentUserId,
        content: commentInput,
      }),
    });

    const newComment = await response.json();
    setComments([...comments, newComment]);
    setCommentInput('');
  };

  const handleDelete = async (commentId) => {
    await fetch(`http://localhost:8096/api/comments/${commentId}?userId=${currentUserId}`, {
      method: 'DELETE',
    });
    setComments(comments.filter((c) => c.commentId !== commentId));
  };

  const handleUpdate = async () => {
    if (!commentInput.trim()) return;

    const response = await fetch(
      `http://localhost:8096/api/comments/${editingCommentId}?userId=${currentUserId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentInput),
      }
    );

    const updatedComment = await response.json();
    setComments(
      comments.map((c) => (c.commentId === updatedComment.commentId ? updatedComment : c))
    );
    setEditingCommentId(null);
    setCommentInput('');
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.commentId);
    setCommentInput(comment.content);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <div className="post">
          <div style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', height: '100vh', paddingBottom: '56.25%', height: 0 }}>
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
          {comments.map((comment) => (
          <div key={comment.commentId} className="comment">
          
            <CommentBox name={comment.userName} text={comment.content} key={comment.commentId} />
            {comment.userId === currentUserId && (
              <>
                <button onClick={() => startEditing(comment)}>Edit</button>
                <button onClick={() => handleDelete(comment.commentId)}>Delete</button>
              </>
            )}
          </div>
        ))}
        </div>
        <div>

      <div className="usercomments">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
        />
        {editingCommentId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAddComment}>Post</button>
        )}
      </div>
    </div>

      </div>
    </div>
  );
}
