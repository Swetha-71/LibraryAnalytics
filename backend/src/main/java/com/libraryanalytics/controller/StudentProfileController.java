package com.libraryanalytics.controller;

import com.libraryanalytics.model.Curriculum;
import com.libraryanalytics.model.StudentProfile;
import com.libraryanalytics.repository.CurriculumRepository;
import com.libraryanalytics.repository.StudentProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/student-profile")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentProfileController {

    private final StudentProfileRepository studentRepo;
    private final CurriculumRepository curriculumRepo;

    public StudentProfileController(StudentProfileRepository studentRepo,
                                    CurriculumRepository curriculumRepo) {
        this.studentRepo = studentRepo;
        this.curriculumRepo = curriculumRepo;
    }

    // GET /api/student-profile/{username}
    @GetMapping("/{username}")
    public ResponseEntity<?> getProfileWithSubjects(@PathVariable String username) {

        Optional<StudentProfile> profileOpt = studentRepo.findByUsername(username);
        if (profileOpt.isEmpty()) {
            // important: return 200 with success:false, not 404
            return ResponseEntity.ok(
                    Map.of("success", false, "message", "Profile not found")
            );
        }

        StudentProfile p = profileOpt.get();

        Optional<Curriculum> curOpt =
                curriculumRepo.findByBranchAndSemester(p.getBranch(), p.getSemester());

        List<Curriculum.Subject> subjects =
                curOpt.map(Curriculum::getSubjects).orElseGet(List::of);

        Map<String, Object> dto = new HashMap<>();
        dto.put("success", true);
        dto.put("username", p.getUsername());
        dto.put("branch", p.getBranch());
        dto.put("semester", p.getSemester());
        dto.put("subjects", subjects);

        return ResponseEntity.ok(dto);
    }
}  