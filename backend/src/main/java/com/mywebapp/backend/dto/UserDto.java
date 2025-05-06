package com.mywebapp.backend.dto;


import java.time.LocalDateTime;

public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String name;
    private String bio;
    private int followersCount;
    private int followingCount;
    private LocalDateTime createdAt;

    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getBio() { return bio; }

    public void setBio(String bio) { this.bio = bio; }

    public int getFollowersCount() { return followersCount; }

    public void setFollowersCount(int followersCount) { this.followersCount = followersCount; }

    public int getFollowingCount() { return followingCount; }

    public void setFollowingCount(int followingCount) { this.followingCount = followingCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}