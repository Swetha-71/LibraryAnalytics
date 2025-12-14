package com.libraryanalytics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "email_otps")
public class EmailOtp {

    @Id
    private String id;

    private String email;
    private String otp;
    private Instant expiresAt;

    public String getId() { return id; }
    public String getEmail() { return email; }
    public String getOtp() { return otp; }
    public Instant getExpiresAt() { return expiresAt; }

    public void setId(String id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setOtp(String otp) { this.otp = otp; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
}
