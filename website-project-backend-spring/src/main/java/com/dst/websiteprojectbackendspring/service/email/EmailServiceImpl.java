package com.dst.websiteprojectbackendspring.service.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    public static final String ADMIN_EMAIL = "maksymilian.leszczynski2020@gmail.com";
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    @Override
    public void sendVerificationEmail(
            String to, String username, EmailTemplateName emailTemplate,
            String activationCode, String subject
    ) throws MessagingException {
        Context context = createProperties(Map.of("username", username, "activationCode", activationCode));
        sendEmail(to, context, emailTemplate.toString().toLowerCase(), subject);
    }

    @Async
    @Override
    public void sendResetPasswordEmail(String to, String username, EmailTemplateName emailTemplate, String generatedToken, String subject) throws MessagingException {
        Context context = createProperties(Map.of("username", username, "generatedToken", generatedToken));
        sendEmail(to, context, emailTemplate.toString().toLowerCase(), subject);
    }

    private Context createProperties(Map<String, Object> chosenProperties) {
        Map<String, Object> properties = new HashMap<>(chosenProperties);

        Context context = new Context();
        context.setVariables(properties);

        return context;
    }

    private void sendEmail(String to, Context properties, String templateName, String subject) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );

        helper.setFrom(ADMIN_EMAIL);
        helper.setTo(to);
        helper.setSubject(subject);

        String template = templateEngine.process(templateName, properties);
        helper.setText(template, true);

        mailSender.send(mimeMessage);
    }
}
