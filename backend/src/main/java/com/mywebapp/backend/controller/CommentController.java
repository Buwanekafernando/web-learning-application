package com.mywebapp.backend.controller;



import com.mywebapp.backend.model.Comment;
import com.mywebapp.backend.service.CommentResponse;
import com.mywebapp.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000") // Match your React frontend origin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @PutMapping("/{commentId}")
    public Comment updateComment(@PathVariable Long commentId,
                                  @RequestParam Long userId,
                                  @RequestBody String newContent) {
        return commentService.updateComment(commentId, userId, newContent);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId, @RequestParam Long userId) {
        commentService.deleteComment(commentId, userId);
    }

  @GetMapping("/post/{postId}")
public List<CommentResponse> getComments(@PathVariable Long postId) {
    List<Comment> comments = commentService.getCommentsForPost(postId);
    return comments.stream().map(CommentResponse::new).toList();
}

}
