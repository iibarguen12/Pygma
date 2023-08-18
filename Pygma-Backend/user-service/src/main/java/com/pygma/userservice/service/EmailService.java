package com.pygma.userservice.service;

import com.pygma.userservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${messages.batchNumber}")
    private String batchNumber;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendEmail(SimpleMailMessage email) {
        javaMailSender.send(email);
    }

    @Async
    public void composeAndSendSignupEmail(User newUser) {
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

    @Async
    public void composeAndSendApplicationEmail(User user) {
        String emailText = """
                Hi %s,
                                                           
                We successfully received your application to our %s Acceleration Program. We are thrilled about the potential of partnering with you to build a better Latin America.
                                                                
                We strive to reply to every founder within two-weeks of your application.
                                                                
                We will assess your application, and if you are selected, we will invite you to a two-round interview process where you will meet our Partners and Pygma Alumni.
                                                                
                Hang in there! We will be back with more updates about your application soon.

                Regards,
                                                                
                Andrés Campo
                Co-founder | CPO
                """;
        emailText = String.format(emailText, user.getName(), batchNumber);
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Confirmation from submission");
        mailMessage.setText(emailText);
        sendEmail(mailMessage);
    }

}
