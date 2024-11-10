package com.dst.websiteprojectbackendspring.service.email;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    void sendVerificationEmail(String to, String username, EmailTemplateName emailTemplate, String activationCode, String subject) throws MessagingException;
    void sendResetPasswordEmail(String to, String username, EmailTemplateName emailTemplate, String generatedToken, String subject) throws MessagingException;
}
