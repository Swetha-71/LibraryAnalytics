package com.libraryanalytics.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "borrowings")
public class Borrowing {
    @Id
    private String id;
    private String studentId;
    private String bookId;
    private String bookTitle;
    private String borrowDate;
    private String returnDate;
    private boolean returned;
}
