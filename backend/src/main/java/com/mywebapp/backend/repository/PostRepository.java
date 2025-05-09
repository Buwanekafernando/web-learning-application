package com.mywebapp.backend.repository;


import com.mywebapp.backend.model.Post;
import com.mywebapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);  // Get all posts by a user
}
