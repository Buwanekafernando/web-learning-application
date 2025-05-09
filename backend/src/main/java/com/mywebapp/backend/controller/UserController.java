package com.mywebapp.backend.controller;

import com.mywebapp.backend.model.User;
import com.mywebapp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "http://localhost:3000") // Adjust to match your frontend
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public String register(@RequestBody User user) {
        return userService.registerUser(user);
    }
}
