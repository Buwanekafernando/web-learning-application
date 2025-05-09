package com.mywebapp.backend.service;

import com.mywebapp.backend.model.Comment;
import com.mywebapp.backend.model.User;
import com.mywebapp.backend.repository.CommentRepository;
import com.mywebapp.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;


    @Autowired
    private UserRepository userRepository;

    // Add a comment
    public Comment addComment(Comment comment) {
        Long userId = comment.getUser().getUser_id();

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            comment.setUser(userOpt.get());
            comment.setCommentedAt(LocalDateTime.now().toString());  // Set the actual User object
            return commentRepository.save(comment);
        } else {
            throw new IllegalArgumentException("User with ID " + userId + " not found");
        }
    }
    // Update a comment
    public Comment updateComment(Long commentId, String newContent) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();
            comment.setContent(newContent);
            return commentRepository.save(comment);
        }
        return null;
    }

    // Delete a comment
    public boolean deleteComment(Long commentId) {
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
            return true;
        }
        return false;
    }

    public List<CommentResponse> getCommentsByPostId(Long postId) {
    List<Comment> comments = commentRepository.findByPostId(postId);
    return comments.stream()
                   .map(comment -> new CommentResponse(
                       comment.getCommentId(),
                       comment.getContent(),
                       comment.getCommentedAt(),
                       comment.getUser() != null ? comment.getUser().getUsername() : null,
                       comment.getUser() != null ? comment.getUser().getUser_id() : null
                   ))
                   .collect(Collectors.toList());
}

}
