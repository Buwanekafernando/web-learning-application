package com.mywebapp.backend.repository;



import com.mywebapp.backend.model.Like;
import com.mywebapp.backend.model.Post;
import com.mywebapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    int countByPost(Post post); // Total likes on a post

    Optional<Like> findByUserAndPost(User user, Post post); // To prevent duplicate likes
}
