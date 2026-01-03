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

    // Create a book
    @PostMapping
    public Map<String, Object> create(@RequestBody Book book) {
        Book saved = repo.save(book);
        return Map.of("success", true, "book", saved);
    }

    // Get all books
    @GetMapping
    public List<Book> all() {
        return repo.findAll();
    }

    // ======  THIS SEARCH ENDPOINT ======
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String query) {
        return repo.findByTitleContainingIgnoreCase(query);
    }
}
