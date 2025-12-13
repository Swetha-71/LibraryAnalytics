package com.libraryanalytics.controller;

import com.libraryanalytics.model.User;
import com.libraryanalytics.model.StudentProfile;
import com.libraryanalytics.model.LoginActivity;
import com.libraryanalytics.repository.UserRepository;
import com.libraryanalytics.repository.StudentProfileRepository;
import com.libraryanalytics.repository.LoginActivityRepository;
import com.libraryanalytics.service.OtpService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final LoginActivityRepository loginActivityRepository;
    private final OtpService otpService;

    public AuthController(UserRepository userRepository,
                          StudentProfileRepository studentProfileRepository,
                          LoginActivityRepository loginActivityRepository,
                          OtpService otpService) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.loginActivityRepository = loginActivityRepository;
        this.otpService = otpService;
    }

    @PostMapping("/send-otp")
    public Map<String, Object> sendOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null) {
            return Map.of("success", false, "message", "Email required");
        }
        otpService.sendOtp(email);
        return Map.of("success", true, "message", "OTP sent");
    }

    // -------- REGISTER --------
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> body) {
        String email    = body.get("email");
        String username = body.get("username");
        String password = body.get("password");
        String otp      = body.get("otp");

        String branch   = body.get("branch");
        String semStr   = body.get("semester");

        if (email == null || username == null || password == null || otp == null) {
            return Map.of("success", false, "message", "Missing fields");
        }
        if (!otpService.verifyOtp(email, otp)) {
            return Map.of("success", false, "message", "Invalid or expired OTP");
        }
        if (userRepository.existsByUsername(username)) {
            return Map.of("success", false, "message", "Username already taken");
        }

        String role = "STUDENT";
        User user = new User(username, password, email, role);
        userRepository.save(user);

        // create student profile if branch + sem given
        if (branch != null && semStr != null) {
            int semester = Integer.parseInt(semStr);
            StudentProfile profile = new StudentProfile(username, branch, semester);
            studentProfileRepository.save(profile);
        }

        // log register with email
        loginActivityRepository.save(
            new LoginActivity(username, email, role, "REGISTER")
        );

        return Map.of(
                "success", true,
                "username", user.getUsername(),
                "email",    user.getEmail(),
                "role",     user.getRole()
        );
    }

    // -------- LOGIN (email OR username) --------
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String identifier = body.get("identifier"); // email or username
        String password   = body.get("password");

        if (identifier == null || password == null) {
            return Map.of("success", false, "message", "Missing fields");
        }

        Optional<User> byUsername = userRepository.findByUsername(identifier);
        User user = byUsername.orElseGet(
                () -> userRepository.findByEmail(identifier).orElse(null)
        );

        // real users
        if (user != null && user.getPassword().equals(password)) {
            loginActivityRepository.save(
                new LoginActivity(
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    "SUCCESS"
                )
            );
            return Map.of(
                    "success", true,
                    "username", user.getUsername(),
                    "email",    user.getEmail(),
                    "role",     user.getRole()
            );
        }

        // demo fallback users – use dummy emails
        if ("admin".equals(identifier) && "admin123".equals(password)) {
            loginActivityRepository.save(
                new LoginActivity("admin", "admin@example.com", "ADMIN", "SUCCESS")
            );
            return Map.of("success", true, "username", "admin", "role", "ADMIN");
        }
        if ("librarian".equals(identifier) && "lib123".equals(password)) {
            loginActivityRepository.save(
                new LoginActivity("librarian", "librarian@example.com", "LIBRARIAN", "SUCCESS")
            );
            return Map.of("success", true, "username", "librarian", "role", "LIBRARIAN");
        }
        if ("student1".equals(identifier) && "stu123".equals(password)) {
            loginActivityRepository.save(
                new LoginActivity("student1", "student1@example.com", "STUDENT", "SUCCESS")
            );
            return Map.of("success", true, "username", "student1", "role", "STUDENT");
        }

        // optional: log failed attempt (no email known)
        loginActivityRepository.save(
            new LoginActivity(identifier, "", "UNKNOWN", "FAIL")
        );

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
