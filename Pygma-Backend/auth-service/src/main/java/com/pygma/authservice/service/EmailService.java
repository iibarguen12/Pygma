package com.pygma.authservice.service;

import com.pygma.authservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendEmail(SimpleMailMessage email) {
        javaMailSender.send(email);
    }

    @Async
    public void composeAndSendEmail(User newUser, String temporalPassword) {
        String emailText = """
        Welcome aboard %s!
        
        The extraordinary potential awaits your company! Let's soar together to new heights and redefine success.
        
        Your temporal password is "%s" please make sure to change it.
        
        See you there!
        
        Pygma
        """.formatted(newUser.getName(), temporalPassword);
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(newUser.getEmail());
        mailMessage.setSubject("Welcome to Pygma!");
        mailMessage.setText(emailText);
        sendEmail(mailMessage);
    }

}
