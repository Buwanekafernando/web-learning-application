import React, { useState, useEffect } from "react";

const LikeDislike = ({ postId, userId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const fetchLikeDislikeCount = async () => {
    try {
      const response = await fetch(`http://localhost:8096/api/likes/${postId}`);
      const data = await response.json();
      setLikeCount(data.likeCount);
      setDislikeCount(data.dislikeCount);
    } catch (error) {
      console.error("Error fetching like/dislike count:", error);
    }
  };

  const handleLikeDislike = async (isLike) => {
    try {
      await fetch(`http://localhost:8096/api/likes/${postId}?isLike=${isLike}&userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      fetchLikeDislikeCount();
    } catch (error) {
      console.error("Error updating like/dislike:", error);
    }
  };

  useEffect(() => {
    fetchLikeDislikeCount();
  }, [postId]);

  return (
    <div>
      <button style={{ backgroundColor:"transparent",fontSize:"20px",border:"none" }} onClick={() => handleLikeDislike(true)}>👍 {likeCount}</button>
      <button style={{ backgroundColor:"transparent",fontSize:"20px",border:"none" }} onClick={() => handleLikeDislike(false)}>👎 {dislikeCount}</button>
    </div>
  );
};

export default LikeDislike;
