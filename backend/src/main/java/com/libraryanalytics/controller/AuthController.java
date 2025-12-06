package com.libraryanalytics.controller;

import com.libraryanalytics.model.User;
import com.libraryanalytics.model.LoginRequest;
import com.libraryanalytics.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String name     = body.get("name");
        String role     = body.getOrDefault("role", "STUDENT");

        if (username == null || password == null || name == null) {
            return Map.of("success", false, "message", "Missing fields");
        }
        if (userRepository.existsByUsername(username)) {
            return Map.of("success", false, "message", "Username already taken");
        }

        User user = new User(username, password, name, role);
        userRepository.save(user);

        return Map.of(
                "success", true,
                "username", user.getUsername(),
                "name", user.getName(),
                "role", user.getRole()
        );
    }

  @PostMapping("/login")
public Map<String, Object> login(@RequestBody Map<String, String> body) {
    String username = body.get("username");
    String password = body.get("password");

    // Check MongoDB first
   User user = userRepository.findByUsername(username).get();

    if (user != null && user.getPassword().equals(password)) {
        return Map.of(
                "success", true,
                "username", user.getUsername(),
                "name", user.getName(),
                "role", user.getRole()
        );
    }

    // Demo fallback users
    if ("admin".equals(username) && "admin123".equals(password)) {
        return Map.of("success", true, "username", "admin", "name", "Admin", "role", "ADMIN");
    }

    if ("librarian".equals(username) && "lib123".equals(password)) {
        return Map.of("success", true, "username", "librarian", "name", "Library Manager", "role", "LIBRARIAN");
    }

    if ("student1".equals(username) && "stu123".equals(password)) {
        return Map.of("success", true, "username", "student1", "name", "Student 1", "role", "STUDENT");
    }

    return Map.of("success", false, "message", "Invalid credentials");
}

    public static class LoginResponse {
        private final String username;
        private final String role;

        public LoginResponse(String username, String role) {
            this.username = username;
            this.role = role;
        }

        public String getUsername() { return username; }
        public String getRole() { return role; }
    }
}
