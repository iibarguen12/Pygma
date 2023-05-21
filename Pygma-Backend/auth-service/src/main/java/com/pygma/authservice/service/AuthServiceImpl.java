package com.pygma.authservice.service;

import com.pygma.authservice.config.JwtGenerator;
import com.pygma.authservice.entity.User;
import com.pygma.authservice.exception.InvalidDataException;
import com.pygma.authservice.exception.NotFoundException;
import com.pygma.authservice.mapper.UserMapper;
import com.pygma.authservice.model.LoginRequest;
import com.pygma.authservice.model.LoginResponse;
import com.pygma.authservice.model.SignupRequest;
import com.pygma.authservice.model.SimpleResponse;
import com.pygma.authservice.util.UserUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService{
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtGenerator jwtGenerator;
    @Autowired
    private EmailService emailService;
    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userService.findUserByUsernameOrEmail(loginRequest.getUsername(), loginRequest.getUsername());
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new NotFoundException("User not found");
        }
        return jwtGenerator.generateToken(user);
    }

    @Override
    public SimpleResponse signup(SignupRequest signupRequest) {
        // TODO check why any user different from pygma is being saved and automatically deleted
        User user;
        try {
            user = userService.findUserByUsernameOrEmail(signupRequest.getUsername(), signupRequest.getEmail());
        }catch (NotFoundException e){
            User newUser = UserMapper.mapSignupRequestToUser(signupRequest);
            String temporalPassword = UserUtils.generateRandomPassword();
            newUser.setPassword(temporalPassword);
            userService.saveUser(newUser);
            emailService.composeAndSendEmail(newUser, temporalPassword);
            return SimpleResponse.builder()
                    .statusCode(200)
                    .message("User registered successfully")
                    .build();
        }
        if (user.getUsername().equals(signupRequest.getUsername())){
            throw new InvalidDataException("Username is already taken");
        } else if (user.getEmail().equals(signupRequest.getEmail())) {
            throw new InvalidDataException("Email is already in use");
        }
        return null;
    }
}
