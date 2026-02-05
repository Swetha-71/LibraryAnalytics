// src/main/java/com/libraryanalytics/controller/RecommendationController.java
package com.libraryanalytics.controller;

import com.libraryanalytics.model.Book;
import com.libraryanalytics.model.Curriculum;
import com.libraryanalytics.model.StudentProfile;
import com.libraryanalytics.repository.BookRepository;
import com.libraryanalytics.repository.CurriculumRepository;
import com.libraryanalytics.repository.StudentProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.libraryanalytics.service.FriendsRecommendationService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:3000")
public class RecommendationController {

    private final StudentProfileRepository studentRepo;
    private final CurriculumRepository curriculumRepo;
    private final BookRepository bookRepo;
// inject FriendsRecommendationService
private final FriendsRecommendationService friendsService;

public RecommendationController(StudentProfileRepository studentRepo,
                                CurriculumRepository curriculumRepo,
                                BookRepository bookRepo,
                                FriendsRecommendationService friendsService) {
    this.studentRepo = studentRepo;
    this.curriculumRepo = curriculumRepo;
    this.bookRepo = bookRepo;
    this.friendsService = friendsService;
}

// existing /semester/{username} method ...

@GetMapping("/friends/{username}")
public ResponseEntity<?> friends(@PathVariable String username) {
    var borrowings = friendsService.friendsAreReading(username);

    Map<String, Object> body = new HashMap<>();
    body.put("success", true);
    body.put("borrowings", borrowings);

    return ResponseEntity.ok(body);
}


    @GetMapping("/semester/{username}")
    public ResponseEntity<?> recommendForSemester(@PathVariable String username) {

        Optional<StudentProfile> profileOpt = studentRepo.findByUsername(username);
        if (profileOpt.isEmpty()) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Student profile not found"));
        }

        StudentProfile p = profileOpt.get();

        Optional<Curriculum> curOpt =
                curriculumRepo.findByBranchAndSemester(p.getBranch(), p.getSemester());
        if (curOpt.isEmpty()) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Curriculum not found"));
        }

        Curriculum cur = curOpt.get();

        List<String> subjectCodes = cur.getSubjects()
                .stream()
                .map(Curriculum.Subject::getCode)
                .collect(Collectors.toList());

        List<Book> books = bookRepo.findBySubjectCodesIn(subjectCodes);

        Map<String, Object> body = new HashMap<>();
        body.put("success", true);
        body.put("branch", p.getBranch());
        body.put("semester", p.getSemester());
        body.put("subjects", cur.getSubjects());
        body.put("books", books);

        return ResponseEntity.ok(body);
    }
}
