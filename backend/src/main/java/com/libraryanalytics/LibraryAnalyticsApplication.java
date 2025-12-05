package com.libraryanalytics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // ← CRITICAL
public class LibraryAnalyticsApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryAnalyticsApplication.class, args);
    }
}
