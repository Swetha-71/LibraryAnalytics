package com.libraryanalytics.controller;

import com.libraryanalytics.model.User;
import com.libraryanalytics.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    String username = request.getUsername();
    String password = request.getPassword();

    // Try Users collection
    User user = userRepository.findByUsername(username);

    if (user == null) {
        // If not found in Users, try Students
        Student student = studentRepository.findByUsername(username);

        if (student == null || !student.getPassword().equals(password)) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // Student auth success
        return ResponseEntity.ok(new LoginResponse(student.getUsername(), "STUDENT"));
    }

    // If user found but password mismatch
    if (!user.getPassword().equals(password)) {
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // Normal user login success
    return ResponseEntity.ok(new LoginResponse(user.getUsername(), user.getRole()));
}
public class LoginResponse {
    private String username;
    private String role;

    public LoginResponse(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public String getUsername() { return username; }
    public String getRole() { return role; }
}

}