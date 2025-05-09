package com.mywebapp.backend.controller;

import com.mywebapp.backend.model.Comment;
import com.mywebapp.backend.service.CommentResponse;
import com.mywebapp.backend.service.CommentService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the frontend
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Add a new comment
    @PostMapping("/add")
public Comment addComment(@RequestBody Comment comment) {
    return commentService.addComment(comment);
}


    // Update an existing comment
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/update/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        String content = comment.getContent();
        return commentService.updateComment(id, content);
    }
    
    
    // Delete a comment
    @DeleteMapping("/delete/{id}")
    public String deleteComment(@PathVariable Long id) {
        boolean deleted = commentService.deleteComment(id);
        return deleted ? "Comment deleted successfully" : "Comment not found";
    }

    @GetMapping("/post/{postId}")
    public List<CommentResponse> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }
}
