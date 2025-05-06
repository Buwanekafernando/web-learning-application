package com.mywebapp.backend.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mywebapp.backend.dto.LoginRequestDto;
import com.mywebapp.backend.dto.UserDto;
import com.mywebapp.backend.entity.User;
import com.mywebapp.backend.security.JwtUtil;
import com.mywebapp.backend.service.CloudinaryService;
import com.mywebapp.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final CloudinaryService cloudinaryService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, CloudinaryService cloudinaryService,JwtUtil jwtUtil) {
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public UserDto register(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
        User user = userService.register(username, email, password);
        return userService.toDto(user);
    }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) {
    Optional<User> userOptional = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

    if (userOptional.isPresent()) {
        User user = userOptional.get();
        String token = jwtUtil.generateToken(user.getUsername());  // 🔐 JWT generated here
        return ResponseEntity.ok(Map.of(
            "token", token,
            "user", userService.toDto(user)
        ));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
    @PutMapping("/update")
    public UserDto updateProfile(Principal principal,
                                 @RequestParam String name,
                                 @RequestParam String bio,
                                 @RequestParam String username) {
        Long userId = Long.parseLong(principal.getName());
        User updated = userService.updateProfile(userId, name, bio, username);
        return userService.toDto(updated);
    }

    @DeleteMapping("/delete")
    public void deleteAccount(Principal principal) {
        Long userId = Long.parseLong(principal.getName());
        userService.deleteAccount(userId);
    }

    @PostMapping("/follow/{targetId}")
    public void followUser(Principal principal, @PathVariable Long targetId) {
        Long userId = Long.parseLong(principal.getName());
        userService.followUser(userId, targetId);
    }

    @PostMapping("/unfollow/{targetId}")
    public void unfollowUser(Principal principal, @PathVariable Long targetId) {
        Long userId = Long.parseLong(principal.getName());
        userService.unfollowUser(userId, targetId);
    }

    // ✅ Upload Profile Picture
    @PostMapping("/uploadProfileImage")
    public ResponseEntity<?> uploadProfileImage(
            Principal principal,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            Long userId = Long.parseLong(principal.getName());
            String imageUrl = cloudinaryService.uploadFile(file);
            User user = userService.getUserById(userId);
            user.setProfileImageUrl(imageUrl);
            userService.saveUser(user);
            return ResponseEntity.ok("Profile picture updated successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }
}
