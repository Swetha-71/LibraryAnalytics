// src/main/java/com/libraryanalytics/controller/CurriculumController.java
package com.libraryanalytics.controller;

import com.libraryanalytics.model.Curriculum;
import com.libraryanalytics.repository.CurriculumRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/curriculum")
@CrossOrigin(origins = "http://localhost:3000")
public class CurriculumController {

    private final CurriculumRepository curriculumRepository;

    public CurriculumController(CurriculumRepository curriculumRepository) {
        this.curriculumRepository = curriculumRepository;
    }

    // create or update curriculum for a branch+semester
    @PostMapping
    public ResponseEntity<?> saveCurriculum(@RequestBody Curriculum body) {
        Optional<Curriculum> existing =
                curriculumRepository.findByBranchAndSemester(body.getBranch(), body.getSemester());

        Curriculum toSave = existing.map(c -> {
            c.setSubjects(body.getSubjects());
            return c;
        }).orElse(body);

        Curriculum saved = curriculumRepository.save(toSave);
        return ResponseEntity.ok(Map.of("success", true, "curriculum", saved));
    }

    // fetch by branch + semester
    @GetMapping
    public ResponseEntity<?> getCurriculum(
            @RequestParam String branch,
            @RequestParam int semester) {

        return curriculumRepository.findByBranchAndSemester(branch, semester)
                .<ResponseEntity<?>>map(c -> ResponseEntity.ok(Map.of("success", true, "curriculum", c)))
                .orElseGet(() -> ResponseEntity.ok(Map.of("success", false, "message", "Not found")));
    }
}
