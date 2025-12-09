package com.libraryanalytics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;
<<<<<<< HEAD

    private String name;
    private String username;
    private String email;     // ⭐ NEW FIELD
    private String password;
    private String role;      // STUDENT, ADMIN, LIBRARIAN
=======
>>>>>>> 54d9ef72a2697d6f661c13b3b7f60db985220289

    private String username;
    private String password;
    private String name;    // keep if you already had it
    private String email;   // NEW
    private String role;

    // No‑args constructor for Spring Data
    public User() {}

<<<<<<< HEAD
    public User(String name, String username, String email, String password, String role) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters & Setters
=======
    // Adjust constructor to include email (and name if you use it)
    public User(String username, String password, String email, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    // getters & setters

>>>>>>> 54d9ef72a2697d6f661c13b3b7f60db985220289
    public String getId() { return id; }

<<<<<<< HEAD
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
=======
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }          // NEW
    public void setEmail(String email) { this.email = email; }
>>>>>>> 54d9ef72a2697d6f661c13b3b7f60db985220289

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getName() { return name; }            // if you still use name
    public void setName(String name) { this.name = name; }
}
        