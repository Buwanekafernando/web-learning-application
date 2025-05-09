package com.mywebapp.backend.repository;



import com.mywebapp.backend.model.Like;
import com.mywebapp.backend.model.Post;
import com.mywebapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Long countByPostAndLiked(Post post, Boolean liked);


    Optional<Like> findByUserAndPost(User user, Post post);
}
