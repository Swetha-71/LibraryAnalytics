package com.libraryanalytics.controller;

import com.libraryanalytics.model.User;
import com.libraryanalytics.model.LoginRequest;
import com.libraryanalytics.dto.RegisterRequest;
import com.libraryanalytics.service.UserService;  // ✅ IMPORTANT IMPORT
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;   // ✅ Declare service

    public AuthController(UserService userService) {  // ✅ Constructor injection
        this.userService = userService;
    }

    // REGISTER
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody RegisterRequest req) {

        if (userService.existsByUsername(req.getUsername())) {
            return Map.of("success", false, "message", "Username already exists");
        }

        if (!req.getEmail().contains("@")) {
            return Map.of("success", false, "message", "Invalid email address");
        }

        User user = new User(
                req.getName(),
                req.getUsername(),
                req.getEmail(),
                req.getPassword(),
                req.getRole() != null ? req.getRole() : "STUDENT"
        );

        userService.saveUser(user);

        return Map.of("success", true, "message", "User registered successfully");
    }

    // LOGIN
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest body) {

        String username = body.getUsername();
        String password = body.getPassword();

        // Database check
        User user = userService.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return Map.of(
                    "success", true,
                    "username", user.getUsername(),
                    "role", user.getRole(),
                    "name", user.getName()
            );
        }

        // Demo fallback users
        if ("admin".equals(username) && "admin123".equals(password)) {
            return Map.of("success", true, "username", "admin", "role", "ADMIN");
        }

        if ("librarian".equals(username) && "lib123".equals(password)) {
            return Map.of("success", true, "username", "librarian", "role", "LIBRARIAN");
        }

        if ("student1".equals(username) && "stu123".equals(password)) {
            return Map.of("success", true, "username", "student1", "role", "STUDENT");
        }

        return Map.of("success", false, "message", "Invalid credentials");
    }
}
