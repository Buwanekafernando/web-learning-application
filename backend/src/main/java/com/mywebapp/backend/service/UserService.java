package com.mywebapp.backend.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mywebapp.backend.dto.UserDto;
import com.mywebapp.backend.entity.User;
import com.mywebapp.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public void saveUser(User user) {
        userRepository.save(user);
    }


    
    public Optional<User> login(String username, String rawPassword) {
        return userRepository.findByUsername(username)
                .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()));
    }

    public User updateProfile(Long userId, String name, String bio, String username) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setName(name);
        user.setBio(bio);
        user.setUsername(username);
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public void deleteAccount(Long userId) {
        userRepository.deleteById(userId);
        // Optionally revoke OAuth tokens here
    }

    public void followUser(Long userId, Long targetId) {
        User user = userRepository.findById(userId).orElseThrow();
        User target = userRepository.findById(targetId).orElseThrow();
        user.getFollowing().add(target);
        target.getFollowers().add(user);
    }

    public void unfollowUser(Long userId, Long targetId) {
        User user = userRepository.findById(userId).orElseThrow();
        User target = userRepository.findById(targetId).orElseThrow();
        user.getFollowing().remove(target);
        target.getFollowers().remove(user);
    }

    public UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setBio(user.getBio());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setFollowersCount(user.getFollowers().size());
        dto.setFollowingCount(user.getFollowing().size());
        return dto;
    }
}