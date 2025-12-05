package com.libraryanalytics.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {
    
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBorrowings", 30);
        stats.put("overdueBooks", 13);
        stats.put("avgBorrowDays", 7.2);
        stats.put("topBooks", Arrays.asList("Data Structures", "Machine Learning", "OS"));
        return stats;
    }
    
    @GetMapping("/overdue")
    public List<Map<String, Object>> getOverdue() {
        return Arrays.asList(
            Map.of("studentId", "3", "bookTitle", "Operating Systems", "daysOverdue", 15),
            Map.of("studentId", "6", "bookTitle", "Artificial Intelligence", "daysOverdue", 12),
            Map.of("studentId", "9", "bookTitle", "Python Crash Course", "daysOverdue", 10)
        );
    }
    
    @GetMapping("/predictions")
    public Map<String, Object> getPredictions() {
        Map<String, Object> predictions = new HashMap<>();
        predictions.put("nextPopularBook", "React Native");
        predictions.put("riskScore", 0.75);
        return predictions;
    }
}
