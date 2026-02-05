package com.libraryanalytics.service;

import com.libraryanalytics.model.Borrowing;
import com.libraryanalytics.model.StudentProfile;
import com.libraryanalytics.repository.BorrowingRepository;
import com.libraryanalytics.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class FriendsRecommendationService {

    private final StudentProfileRepository studentRepo;
    private final BorrowingRepository borrowingRepo;

    public FriendsRecommendationService(StudentProfileRepository studentRepo,
                                        BorrowingRepository borrowingRepo) {
        this.studentRepo = studentRepo;
        this.borrowingRepo = borrowingRepo;
    }

    public List<Borrowing> friendsAreReading(String username) {
        StudentProfile me = studentRepo.findByUsername(username).orElse(null);
        if (me == null) return Collections.emptyList();

        List<StudentProfile> classmates =
                studentRepo.findByBranchAndSemester(me.getBranch(), me.getSemester());

        List<String> classmateIds = classmates.stream()
                .map(StudentProfile::getUsername)   // username == studentId in Borrowing
                .filter(u -> !u.equals(username))
                .toList();
        if (classmateIds.isEmpty()) return Collections.emptyList();

        // Just return classmates' borrowings (no Book repo needed)
        return borrowingRepo.findByStudentIdIn(classmateIds);
    }
}
