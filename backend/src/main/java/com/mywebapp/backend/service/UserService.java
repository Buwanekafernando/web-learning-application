package com.mywebapp.backend.service;

import com.mywebapp.backend.model.User;
import com.mywebapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already registered.";
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already taken.";
        }
        userRepository.save(user);
        return "Success";
    }
}
