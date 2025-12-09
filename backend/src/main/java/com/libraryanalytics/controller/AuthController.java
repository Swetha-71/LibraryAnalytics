package com.libraryanalytics.controller;

import com.libraryanalytics.model.User;
<<<<<<< HEAD
import com.libraryanalytics.model.LoginRequest;
import com.libraryanalytics.dto.RegisterRequest;
import com.libraryanalytics.service.UserService;  // ✅ IMPORTANT IMPORT
=======
import com.libraryanalytics.repository.UserRepository;
>>>>>>> 54d9ef72a2697d6f661c13b3b7f60db985220289
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

<<<<<<< HEAD
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
=======
    // -------- REGISTER --------
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> body) {
        String email    = body.get("email");
        String username = body.get("username");
        String password = body.get("password");
        String role     = body.getOrDefault("role", "STUDENT");

        if (email == null || username == null || password == null) {
            return Map.of("success", false, "message", "Missing fields");
        }
        if (userRepository.existsByUsername(username)) {
            return Map.of("success", false, "message", "Username already taken");
        }

        User user = new User(username, password, email, role);
        userRepository.save(user);

        return Map.of(
                "success", true,
                "username", user.getUsername(),
                "email",    user.getEmail(),
                "role",     user.getRole()
>>>>>>> 54d9ef72a2697d6f661c13b3b7f60db985220289
        );

        userService.saveUser(user);

        return Map.of("success", true, "message", "User registered successfully");
    }

<<<<<<< HEAD
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
=======
    // -------- LOGIN (email OR username) --------
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String identifier = body.get("identifier"); // email or username
        String password   = body.get("password");

        if (identifier == null || password == null) {
            return Map.of("success", false, "message", "Missing fields");
        }

        // Try by username first
        Optional<User> byUsername = userRepository.findByUsername(identifier);

        // If not found, try by email
        User user = byUsername.orElseGet(
                () -> userRepository.findByEmail(identifier).orElse(null)
        );

        if (user != null && user.getPassword().equals(password)) {
            return Map.of(
                    "success", true,
                    "username", user.getUsername(),
                    "email",    user.getEmail(),
                    "role",     user.getRole()
            );
        }

        // Demo fallback users using the same identifier
        if ("admin".equals(identifier) && "admin123".equals(password)) {
            return Map.of("success", true, "username", "admin", "role", "ADMIN");
        }
        if ("librarian".equals(identifier) && "lib123".equals(password)) {
            return Map.of("success", true, "username", "librarian", "role", "LIBRARIAN");
        }
        if ("student1".equals(identifier) && "stu123".equals(password)) {
            return Map.of("success", true, "username", "student1", "role", "STUDENT");
        }

        return Map.of("success", false, "message", "Invalid credentials");
    }

    // Optional DTO
    public static class LoginResponse {
        private final String username;
        private final String role;

        public LoginResponse(String username, String role) {
            this.username = username;
            this.role = role;
>>>>>>> 54d9ef72a2697d6f661c13b3b7f60db985220289
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
