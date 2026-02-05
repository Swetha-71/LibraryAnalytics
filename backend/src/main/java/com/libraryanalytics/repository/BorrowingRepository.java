package com.libraryanalytics.repository;

import com.libraryanalytics.model.Borrowing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowingRepository extends MongoRepository<Borrowing, String> {

    // all borrowings of one student
    List<Borrowing> findByStudentId(String studentId);

    // borrowings of many students (friends / classmates)
    List<Borrowing> findByStudentIdIn(List<String> studentIds);
}
