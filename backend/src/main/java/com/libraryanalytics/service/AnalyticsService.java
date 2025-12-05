package com.libraryanalytics.service;

import com.libraryanalytics.model.AnalyticsResult;
import com.libraryanalytics.repository.BorrowingRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {
    
    private final BorrowingRepository borrowingRepository;
    
    public AnalyticsService(BorrowingRepository borrowingRepository) {
        this.borrowingRepository = borrowingRepository;
    }
    
    public AnalyticsResult summary() {
        // Return stub data - replace with real logic later
        AnalyticsResult result = new AnalyticsResult();
        result.setTotalBorrowings(30);
        result.setOverdueCount(12);
        return result;
    }
}
