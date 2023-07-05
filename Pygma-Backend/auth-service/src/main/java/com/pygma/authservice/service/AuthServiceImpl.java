package com.pygma.authservice.service;

import com.pygma.authservice.entity.Role;
import com.pygma.authservice.entity.User;
import com.pygma.authservice.exception.InvalidDataException;
import com.pygma.authservice.exception.NotFoundException;
import com.pygma.authservice.mapper.UserMapper;
import com.pygma.authservice.model.*;
import com.pygma.authservice.util.UserUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService{
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtGeneratorService jwtGeneratorService;
    @Autowired
    private EmailService emailService;
    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userService.findUserByUsernameOrEmail(loginRequest.getUsername(), loginRequest.getUsername());
        if (!loginRequest.getIsGoogleAuth()){
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
                throw new NotFoundException("User not found");
            }
        }
        return jwtGeneratorService.generateToken(user);
    }

    @Override
    public SimpleResponse signup(SignupRequest signupRequest) {
        User user;
        try {
            user = userService.findUserByUsernameOrEmail(signupRequest.getUsername(), signupRequest.getEmail());
        }catch (NotFoundException e){
            saveAndSendEmail(signupRequest);
            return SimpleResponse.builder()
                    .statusCode(200)
                    .message("User registered successfully")
                    .build();
        }
        if (user.getUsername().equals(signupRequest.getUsername())){
            throw new InvalidDataException("Username is already in use");
        } else if (user.getEmail().equals(signupRequest.getEmail())) {
            throw new InvalidDataException("Email is already in use");
        }
        return null;
    }

    private void saveAndSendEmail(SignupRequest signupRequest) {
        User newUser = UserMapper.mapSignupRequestToUser(signupRequest);
        String temporalPassword = UserUtils.generateRandomPassword();
        newUser.setPassword(temporalPassword);
        Set<Role> userRole = userService.getRoles()
                .stream()
                .filter(role -> role.getName().equals(Roles.ROLE_USER.name()))
                .collect(Collectors.toSet());
        newUser.setRoles(userRole);
        userService.saveUser(newUser);
        emailService.composeAndSendEmail(newUser, temporalPassword, signupRequest.getIsGoogleAuth());
    }

    @Override
    public LoginResponse refreshToken(RefreshTokenRequest token) {
        return jwtGeneratorService.refreshToken(token.getRefreshToken());
    }
}
