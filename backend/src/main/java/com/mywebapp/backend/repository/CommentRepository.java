package com.mywebapp.backend.repository;



import com.mywebapp.backend.model.Comment;
import com.mywebapp.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post); // Get comments for a specific post
}

