// src/main/java/com/libraryanalytics/model/StudentProfile.java
package com.libraryanalytics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student_profiles")
public class StudentProfile {

    @Id
    private String id;

    private String username;   // link to User.username
    private String branch;     // e.g. "CSE"
    private int semester;      // e.g. 6

    public StudentProfile() {}

    public StudentProfile(String username, String branch, int semester) {
        this.username = username;
        this.branch = branch;
        this.semester = semester;
    }

    public String getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public int getSemester() { return semester; }
    public void setSemester(int semester) { this.semester = semester; }
}
