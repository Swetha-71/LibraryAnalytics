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

        // 1️⃣ Get logged-in student profile
        StudentProfile me = studentRepo.findByUsername(username).orElse(null);
        if (me == null) return Collections.emptyList();

        // 2️⃣ Get classmates (same branch + semester)
        List<StudentProfile> classmates =
                studentRepo.findByBranchAndSemester(me.getBranch(), me.getSemester());

        // 3️⃣ Extract classmate usernames (exclude self)
        List<String> classmateIds = classmates.stream()
                .map(StudentProfile::getUsername)   // username == studentId
                .filter(u -> !u.equalsIgnoreCase(username)) // 🚫 exclude self
                .toList();

        if (classmateIds.isEmpty()) return Collections.emptyList();

        // 4️⃣ Fetch ONLY currently borrowed books by classmates
        return borrowingRepo.findByStudentIdInAndReturnedFalse(classmateIds);
    }
}
