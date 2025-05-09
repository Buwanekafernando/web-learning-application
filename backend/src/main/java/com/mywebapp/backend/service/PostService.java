package com.mywebapp.backend.service;

import com.mywebapp.backend.model.Post;
import java.util.List;

public interface PostService {
    Post createPost(Long userId, String caption, String imageUrl);
    List<Post> getAllPosts();
    Post updatePost(Long postId, String caption);
    void deletePost(Long postId);
}
