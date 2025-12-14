// src/main/java/com/libraryanalytics/repository/CurriculumRepository.java
package com.libraryanalytics.repository;

import com.libraryanalytics.model.Curriculum;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CurriculumRepository extends MongoRepository<Curriculum, String> {
    Optional<Curriculum> findByBranchAndSemester(String branch, int semester);
}
