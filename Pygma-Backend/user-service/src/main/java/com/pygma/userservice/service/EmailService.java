package com.pygma.userservice.service;

import com.pygma.userservice.entity.User;
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
    public void composeAndSendEmail(User newUser) {
        String emailText = """
                Welcome aboard %s!

                The extraordinary potential awaits your company! Let's soar together to new heights and redefine success.

                %s

                See you there!

                Pygma""";

        String authPart = newUser.getIsGoogleAuth() ?
                "Please use your Google account to login.":
                String.format("Your temporary password is \"%s\". Please make sure to change it.", newUser.getPassword());

        emailText = String.format(emailText, newUser.getName(), authPart);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(newUser.getEmail());
        mailMessage.setSubject("Welcome to Pygma!");
        mailMessage.setText(emailText);
        sendEmail(mailMessage);
    }

}
