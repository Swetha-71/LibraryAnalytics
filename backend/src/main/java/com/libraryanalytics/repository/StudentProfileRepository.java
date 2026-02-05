package com.libraryanalytics.repository;

import com.libraryanalytics.model.StudentProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository extends MongoRepository<StudentProfile, String> {

    Optional<StudentProfile> findByUsername(String username);

    List<StudentProfile> findByBranchAndSemester(String branch, Integer semester);
}
