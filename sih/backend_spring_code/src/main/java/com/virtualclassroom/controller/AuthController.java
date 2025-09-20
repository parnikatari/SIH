package com.virtualclassroom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.virtualclassroom.model.User;
import com.virtualclassroom.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            return "User already exists!";
        }
        userRepo.save(user);
        return "Signup successful!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existing = userRepo.findByUsername(user.getUsername());
        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            return "Login successful!";
        }
        return "Invalid credentials!";
    }
}
