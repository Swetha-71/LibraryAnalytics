package com.libraryanalytics.controller;

import com.libraryanalytics.model.Profile;
import com.libraryanalytics.repository.ProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfilesController {

    private final ProfileRepository profileRepo;

    public ProfilesController(ProfileRepository profileRepo) {
        this.profileRepo = profileRepo;
    }

    // ---------------- GET profile by username ----------------
    @GetMapping("/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        Profile profile = profileRepo.findByUsername(username).orElse(null);

        if (profile == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Profile not found");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(profile);
    }

    // ---------------- CREATE or UPDATE profile ----------------
    @PutMapping("/{username}")
    public ResponseEntity<?> updateProfile(
            @PathVariable String username,
            @RequestBody Profile updated
    ) {
        // Find existing profile or create a new one
        Profile profile = profileRepo.findByUsername(username)
                .orElseGet(() -> {
                    Profile p = new Profile();
                    p.setUsername(username);
                    return p;
                });

        // Update fields (all as strings)
        profile.setName(updated.getName() != null ? updated.getName() : profile.getName());
        profile.setEmail(updated.getEmail() != null ? updated.getEmail() : profile.getEmail());
        profile.setBranch(updated.getBranch() != null ? updated.getBranch() : profile.getBranch());
        profile.setSemester(updated.getSemester() != null ? updated.getSemester() : profile.getSemester());

        // Save to MongoDB
        Profile saved = profileRepo.save(profile);

        return ResponseEntity.ok(saved);
    }
}
