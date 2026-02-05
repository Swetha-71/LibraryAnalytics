package com.libraryanalytics.repository;

import com.libraryanalytics.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    // used in RecommendationController for curriculum-based recs
    List<Book> findBySubjectCodesIn(List<String> subjectCodes);

    // used in FriendsRecommendationService
    List<Book> findByIdIn(List<String> ids);

    // used in BookController search
    List<Book> findByTitleContainingIgnoreCase(String title);
}
