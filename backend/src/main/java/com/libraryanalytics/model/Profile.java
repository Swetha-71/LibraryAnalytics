package com.libraryanalytics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "profiles")
public class Profile {

    @Id
    private String id;
    private String username;
    private String name;
    private String email;
    private String branch;
    private Integer semester;

    // Constructors
    public Profile() {}

    public Profile(String username, String name, String email, String branch, Integer semester) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.branch = branch;
        this.semester = semester;
    }

    // Getters & Setters
    public String getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }
}
