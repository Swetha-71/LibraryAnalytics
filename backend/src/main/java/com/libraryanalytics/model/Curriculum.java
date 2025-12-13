// src/main/java/com/libraryanalytics/model/Curriculum.java
package com.libraryanalytics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "curriculum")
public class Curriculum {

    @Id
    private String id;

    private String branch;   // e.g. "CSE"
    private int semester;    // e.g. 6

    public static class Subject {
        private String code;       // 23CSE601
        private String name;       // Machine Learning Essentials
        private String shortName;  // MLE

        public Subject() {}

        public Subject(String code, String name, String shortName) {
            this.code = code;
            this.name = name;
            this.shortName = shortName;
        }

        public String getCode() { return code; }
        public String getName() { return name; }
        public String getShortName() { return shortName; }

        public void setCode(String code) { this.code = code; }
        public void setName(String name) { this.name = name; }
        public void setShortName(String shortName) { this.shortName = shortName; }
    }

    private List<Subject> subjects;   // theory subjects only

    public Curriculum() {}

    public Curriculum(String branch, int semester, List<Subject> subjects) {
        this.branch = branch;
        this.semester = semester;
        this.subjects = subjects;
    }

    public String getId() { return id; }
    public String getBranch() { return branch; }
    public int getSemester() { return semester; }
    public List<Subject> getSubjects() { return subjects; }

    public void setBranch(String branch) { this.branch = branch; }
    public void setSemester(int semester) { this.semester = semester; }
    public void setSubjects(List<Subject> subjects) { this.subjects = subjects; }
}
