package com.libraryanalytics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "login_activity")
public class LoginActivity {

    @Id
    private String id;

    private String username;
    private String email;
    private String role;
    private String status;
    private Instant timestamp = Instant.now();

    public LoginActivity() {
    }

    public LoginActivity(String username, String email, String role, String status) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.status = status;
        this.timestamp = Instant.now();
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}
