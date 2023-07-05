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
    public void composeAndSendEmail(User newUser, String temporalPassword, Boolean isGoogleAuth) {
        String emailText = """
                Welcome aboard %s!

                The extraordinary potential awaits your company! Let's soar together to new heights and redefine success.

                %s

                See you there!

                Pygma""";

        String authPart = isGoogleAuth ?
                "Please use your Google account to login.":
                String.format("Your temporal password is \"%s\". Please make sure to change it.", temporalPassword);

        emailText = String.format(emailText, newUser.getName(), authPart);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(newUser.getEmail());
        mailMessage.setSubject("Welcome to Pygma!");
        mailMessage.setText(emailText);
        sendEmail(mailMessage);
    }

}
