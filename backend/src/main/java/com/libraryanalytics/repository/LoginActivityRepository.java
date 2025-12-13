package com.libraryanalytics.repository;

import com.libraryanalytics.model.LoginActivity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LoginActivityRepository extends MongoRepository<LoginActivity, String> {
    List<LoginActivity> findAllByOrderByTimestampDesc();
}
