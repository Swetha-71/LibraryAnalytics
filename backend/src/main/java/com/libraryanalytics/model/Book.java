// src/main/java/com/libraryanalytics/model/Book.java
package com.libraryanalytics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "books")
public class Book {

    @Id
    private String id;

    private String title;
    private String author;
    private List<String> subjectCodes; // e.g. ["23CSE601","23CSE602"]

    public Book() {}

    public Book(String title, String author, List<String> subjectCodes) {
        this.title = title;
        this.author = author;
        this.subjectCodes = subjectCodes;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public List<String> getSubjectCodes() { return subjectCodes; }

    public void setTitle(String title) { this.title = title; }
    public void setAuthor(String author) { this.author = author; }
    public void setSubjectCodes(List<String> subjectCodes) { this.subjectCodes = subjectCodes; }
}
