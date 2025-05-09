package com.mywebapp.backend.repository;




import com.mywebapp.backend.model.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);

    

}
