// src/main/java/com/libraryanalytics/repository/StudentProfileRepository.java
package com.libraryanalytics.repository;

import com.libraryanalytics.model.StudentProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StudentProfileRepository extends MongoRepository<StudentProfile, String> {
    Optional<StudentProfile> findByUsername(String username);
}
