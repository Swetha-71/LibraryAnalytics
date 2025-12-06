package com.libraryanalytics;

import com.libraryanalytics.model.User;
import com.libraryanalytics.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LibraryAnalyticsApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryAnalyticsApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(UserRepository userRepo) {
        return args -> {
            if (userRepo.count() == 0) {
                System.out.println("Preloading demo users...");

                userRepo.save(new User("admin",     "admin123", "Admin User",   "ADMIN"));
                userRepo.save(new User("librarian", "lib123",   "Library User", "MANAGER"));
                userRepo.save(new User("student1",  "stu123",   "Student One",  "STUDENT"));

                System.out.println("Demo users added.");
            } else {
                System.out.println("Users already exist in DB, skipping preload.");
            }
        };
    }
}
