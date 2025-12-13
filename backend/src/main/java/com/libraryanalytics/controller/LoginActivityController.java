package com.libraryanalytics.controller;

import com.libraryanalytics.model.LoginActivity;
import com.libraryanalytics.repository.LoginActivityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/login-activity")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginActivityController {

    private final LoginActivityRepository repo;

    public LoginActivityController(LoginActivityRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<LoginActivity> getAll() {
        return repo.findAllByOrderByTimestampDesc();
    }
}
