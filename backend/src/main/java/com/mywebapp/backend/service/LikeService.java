package com.mywebapp.backend.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mywebapp.backend.model.Like;
import com.mywebapp.backend.model.Post;
import com.mywebapp.backend.model.User;
import com.mywebapp.backend.repository.LikeRepository;
import com.mywebapp.backend.repository.PostRepository;
import com.mywebapp.backend.repository.UserRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public void handleLikeDislike(Long postId, Long userId, Boolean isLike) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        Optional<Like> existingLike = likeRepository.findByUserAndPost(user, post);

        if (existingLike.isPresent()) {
            Like like = existingLike.get();
            like.setLiked(isLike);
            likeRepository.save(like);
        } else {
            Like newLike = new Like();
            newLike.setUser(user);
            newLike.setPost(post);
            newLike.setLiked(isLike);
            likeRepository.save(newLike);
        }
    }

    public Map<String, Long> getLikeDislikeCount(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        Long likeCount = likeRepository.countByPostAndLiked(post, true);
        Long dislikeCount = likeRepository.countByPostAndLiked(post, false);

        Map<String, Long> response = new HashMap<>();
        response.put("likeCount", likeCount);
        response.put("dislikeCount", dislikeCount);

        return response;
    }
}
