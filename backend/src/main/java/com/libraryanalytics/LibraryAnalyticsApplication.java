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

                // Updated: name, username, email, password, role
                userRepo.save(new User(
                        "Admin User",
                        "admin",
                        "admin@gmail.com",
                        "admin123",
                        "ADMIN"
                ));

                userRepo.save(new User(
                        "Library User",
                        "librarian",
                        "librarian@gmail.com",
                        "lib123",
                        "LIBRARIAN"
                ));

                userRepo.save(new User(
                        "Student One",
                        "student1",
                        "student1@gmail.com",
                        "stu123",
                        "STUDENT"
                ));

                System.out.println("Demo users added.");
            } else {
                System.out.println("Users already exist in DB, skipping preload.");
            }
        };
    }
}
