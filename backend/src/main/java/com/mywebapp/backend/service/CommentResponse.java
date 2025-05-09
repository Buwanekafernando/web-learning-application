package com.mywebapp.backend.service;

import java.time.LocalDateTime;

import com.mywebapp.backend.model.Comment;


public class CommentResponse {
    private Long commentId;
    private String content;
    private String userName;
    private LocalDateTime commentedAt;

    // Constructor
    public CommentResponse(Comment comment) {
        this.commentId = comment.getCommentId();
        this.content = comment.getContent();
        this.userName = comment.getUser() != null ? comment.getUser().getName() : "Unknown";
        this.commentedAt = comment.getCommentedAt();
    }

    // Getters
    public Long getCommentId() {
        return commentId;
    }

    public String getContent() {
        return content;
    }

    public String getUserName() {
        return userName;
    }

    public LocalDateTime getCommentedAt() {
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
        this.userName = userName;
    }

    public void setCommentedAt(LocalDateTime commentedAt) {
        this.commentedAt = commentedAt;
    }
}
