package com.libraryanalytics.service;

import com.libraryanalytics.model.EmailOtp;
import com.libraryanalytics.repository.EmailOtpRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Random;

@Service
public class OtpService {

    private final JavaMailSender mailSender;
    private final EmailOtpRepository emailOtpRepository;
    private final Random random = new Random();

    public OtpService(JavaMailSender mailSender, EmailOtpRepository emailOtpRepository) {
        this.mailSender = mailSender;
        this.emailOtpRepository = emailOtpRepository;
    }

    public void sendOtp(String email) {
        String otp = String.valueOf(100000 + random.nextInt(900000));
        Instant expiry = Instant.now().plus(Duration.ofMinutes(5));

        emailOtpRepository.deleteByEmail(email);

        EmailOtp token = new EmailOtp();
        token.setEmail(email);
        token.setOtp(otp);
        token.setExpiresAt(expiry);
        emailOtpRepository.save(token);

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("Your LibraryAnalytics OTP");
        msg.setText("Your OTP is: " + otp + " (valid for 5 minutes)");
        mailSender.send(msg);
    }

    public boolean verifyOtp(String email, String otp) {
        return emailOtpRepository.findByEmailAndOtp(email, otp)
                .filter(t -> t.getExpiresAt().isAfter(Instant.now()))
                .isPresent();
    }
}
