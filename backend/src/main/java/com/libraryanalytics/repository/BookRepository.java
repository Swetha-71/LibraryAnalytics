package com.libraryanalytics.repository;

import com.libraryanalytics.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {
    List<Book> findBySubjectCodesIn(List<String> subjectCodes);
}
