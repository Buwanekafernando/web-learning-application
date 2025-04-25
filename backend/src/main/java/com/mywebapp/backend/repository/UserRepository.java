package com.mywebapp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mywebapp.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email); // optional helper method
}


