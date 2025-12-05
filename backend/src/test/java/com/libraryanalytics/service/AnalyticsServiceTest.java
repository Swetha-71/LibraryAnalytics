package com.libraryanalytics.service;

import com.libraryanalytics.repository.BorrowingRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class AnalyticsServiceTest {

    @Test
    public void testSummary_notNull() {
        BorrowingRepository repo = Mockito.mock(BorrowingRepository.class);
        AnalyticsService service = new AnalyticsService(repo);
        assertNotNull(service.summary());
    }
}
