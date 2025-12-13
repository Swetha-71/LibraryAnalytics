package com.libraryanalytics.repository;

import com.libraryanalytics.model.EmailOtp;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EmailOtpRepository extends MongoRepository<EmailOtp, String> {
    Optional<EmailOtp> findByEmailAndOtp(String email, String otp);
    void deleteByEmail(String email);
}
