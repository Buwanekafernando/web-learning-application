package com.mywebapp.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mywebapp.backend.service.LikeService;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the frontend
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> likeOrDislikePost(
            @PathVariable Long postId,
            @RequestParam Boolean isLike,
            @RequestParam Long userId) {
        try {
            likeService.handleLikeDislike(postId, userId, isLike);
            return ResponseEntity.ok("Like/Dislike updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Map<String, Long>> getLikeDislikeCount(@PathVariable Long postId) {
        Map<String, Long> response = likeService.getLikeDislikeCount(postId);
        return ResponseEntity.ok(response);
    }
}
