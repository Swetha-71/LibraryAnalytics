package com.libraryanalytics.repository;

import com.libraryanalytics.model.Borrowing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowingRepository extends MongoRepository<Borrowing, String> {
}
