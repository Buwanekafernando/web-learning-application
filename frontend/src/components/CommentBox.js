import React from "react";

export default function CommentBox({ name, text , key}) {
  return (
    <div className="comment-box">
      <div className="avatar">👤</div>
      <div className="comment-content">
        <p className="name">{name}</p>
        <p className="text">{text}</p>
      </div>
      <div className="attachments">📎 🖼️</div>
    </div>
  );
}
