package com.mywebapp.backend.service;



import com.mywebapp.backend.model.Comment;
import com.mywebapp.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment addComment(Comment comment) {
      //  System.out.println("User ID: " + comment.getUser().getUser_id());

        comment.setCommentedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long commentId, Long userId, String newContent) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent() && optionalComment.get().getUser().getUser_id().equals(userId)) {
            Comment comment = optionalComment.get();
            comment.setContent(newContent);
            return commentRepository.save(comment);
        }
        throw new RuntimeException("Unauthorized or comment not found");
    }

    public void deleteComment(Long commentId, Long userId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent() && optionalComment.get().getUser().getUser_id().equals(userId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new RuntimeException("Unauthorized or comment not found");
        }
    }

    public List<Comment> getCommentsForPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}
