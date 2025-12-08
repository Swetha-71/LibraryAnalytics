package com.libraryanalytics.repository;

import com.libraryanalytics.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);   // NEW

    boolean existsByUsername(String username);
}
