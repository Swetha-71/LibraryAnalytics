package com.libraryanalytics.model;

public class AnalyticsResult {
    private int totalBorrowings;
    private int overdueCount;

    public AnalyticsResult() {}

    public AnalyticsResult(int totalBorrowings, int overdueCount) {
        this.totalBorrowings = totalBorrowings;
        this.overdueCount = overdueCount;
    }

    public int getTotalBorrowings() {
        return totalBorrowings;
    }

    public void setTotalBorrowings(int totalBorrowings) {
        this.totalBorrowings = totalBorrowings;
    }

    public int getOverdueCount() {
        return overdueCount;
    }

    public void setOverdueCount(int overdueCount) {
        this.overdueCount = overdueCount;
    }
}
