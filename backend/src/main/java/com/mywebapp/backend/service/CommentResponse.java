package com.mywebapp.backend.service;

import java.time.LocalDateTime;

import com.mywebapp.backend.model.Comment;


public class CommentResponse {
    private Long commentId;
    private String content;
    private String commentedAt;
    private String username;
    private Long userId;
    

    // Constructor
    public CommentResponse(Long commentId, String content, String commentedAt, String username, Long userId) {
        this.commentId = commentId;
        this.content = content;
        this.commentedAt = commentedAt;
        this.username = username;
        this.userId = userId;
    }

    // Getters
    public Long getCommentId() {
        return commentId;
    }

    public String getContent() {
        return content;
    }

    public String getUserName() {
        return username;
    }

    public String getCommentedAt() {
        return commentedAt;
    }

    // Setters
    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public Long getUserId() {
        return userId;
    }

    public void setCommentedAt(String commentedAt) {
        this.commentedAt = commentedAt;
    }
}
