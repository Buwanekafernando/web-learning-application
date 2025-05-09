package com.mywebapp.backend.service;



import com.mywebapp.backend.model.Post;
import com.mywebapp.backend.model.User;
import com.mywebapp.backend.repository.PostRepository;
import com.mywebapp.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public Post createPost(Long userId, String caption, String imageUrl) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setUser(user);
        post.setCaption(caption);
        post.setImageUrl(imageUrl);

        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post updatePost(Long postId, String caption) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setCaption(caption);
        return postRepository.save(post);
    }

    @Override
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }
}

