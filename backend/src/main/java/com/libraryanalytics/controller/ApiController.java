package com.libraryanalytics.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {
    
    private final Map<String, Borrowing> database = new ConcurrentHashMap<>();
    private long nextId = 1000L;
    
    public ApiController() {
        initDatabase();
    }
    
    @GetMapping("/borrowings")
    public List<Borrowing> getBorrowings() {
        return new ArrayList<>(database.values());
    }
    
    @PostMapping("/borrowings")
    public Borrowing addBorrowing(@RequestBody Borrowing newBorrowing) {
        String id = String.valueOf(nextId++);
        Borrowing borrowing = new Borrowing(id, newBorrowing.studentId, newBorrowing.bookId, 
                                          newBorrowing.bookTitle, newBorrowing.borrowDate, 
                                          newBorrowing.returnDate, newBorrowing.returned);
        database.put(id, borrowing);
        return borrowing;
    }
    
    @DeleteMapping("/borrowings/{id}")
    public void deleteBorrowing(@PathVariable String id) {
        database.remove(id);
    }
    
    
    private void initDatabase() {
        database.put("1", new Borrowing("1","1","101","Data Structures","2024-01-02","2024-01-09",false));
        database.put("2", new Borrowing("2","2","102","Machine Learning Basics","2024-01-03","2024-01-11",false));
        database.put("3", new Borrowing("3","3","103","Operating Systems","2024-01-05",null,false));
    }
    
    public static class Borrowing {
        public String id, studentId, bookId, bookTitle, borrowDate, returnDate;
        public boolean returned;
        
        public Borrowing() {}
        
        public Borrowing(String id, String studentId, String bookId, String bookTitle, 
                        String borrowDate, String returnDate, boolean returned) {
            this.id = id;
            this.studentId = studentId;
            this.bookId = bookId;
            this.bookTitle = bookTitle;
            this.borrowDate = borrowDate;
            this.returnDate = returnDate;
            this.returned = returned;
        }
    }
    
    public static class AuthRequest {
        public String username, password;
    }
    
    public static class AuthResponse {
        public boolean success;
        public String username, name, role;
        
        public AuthResponse(boolean success, String username, String name, String role) {
            this.success = success;
            this.username = username;
            this.name = name;
            this.role = role;
        }
    }
    // === Authentication Support ===
//private final Map<String, String[]> users = new HashMap<>();

//@PostConstruct
//public void initUsers() {
  //  users.put("admin", new String[]{"admin123", "Admin User", "ADMIN"});
    //users.put("librarian", new String[]{"lib123", "Library Staff", "LIBRARIAN"});
    //users.put("student1", new String[]{"stu123", "Student One", "STUDENT"});
//}

//@PostMapping("/login")
//public AuthResponse login(@RequestBody AuthRequest request) {
  //  String[] userInfo = users.get(request.username);
//
  //  if (userInfo != null && userInfo[0].equals(request.password)) {
    //    return new AuthResponse(true, request.username, userInfo[1], userInfo[2]);
    //}
    //return new AuthResponse(false, null, null, null);
//}

}  // ← FINAL CLOSING BRACE
