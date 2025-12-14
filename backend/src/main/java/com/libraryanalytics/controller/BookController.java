// src/main/java/com/libraryanalytics/controller/BookController.java
package com.libraryanalytics.controller;

import com.libraryanalytics.model.Book;
import com.libraryanalytics.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookRepository repo;

    public BookController(BookRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Map<String, Object> create(@RequestBody Book book) {
        Book saved = repo.save(book);
        return Map.of("success", true, "book", saved);
    }

    @GetMapping
    public List<Book> all() {
        return repo.findAll();
    }
}
