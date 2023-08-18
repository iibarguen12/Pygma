package com.pygma.userservice.service;

import com.pygma.userservice.entity.Role;
import com.pygma.userservice.entity.User;
import com.pygma.userservice.exception.InvalidDataException;
import com.pygma.userservice.exception.NotFoundException;
import com.pygma.userservice.mapper.UserMapper;
import com.pygma.userservice.model.*;
import com.pygma.userservice.util.UserUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.pygma.userservice.util.UserUtils.IMAGE_URL_PREFIX;

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
        if (!user.getIsGoogleAuth()){
            if (loginRequest.getIsGoogleAuth() && !user.getIsGoogleAuth()){
                throw new NotFoundException("User registered by email/username and password, please use that method");
            }
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
            saveAndSendSignupEmail(signupRequest);
            return SimpleResponse.builder()
                    .status(200)
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

    private void saveAndSendSignupEmail(SignupRequest signupRequest) {
        User newUser = UserMapper.mapSignupRequestToUser(signupRequest);
        String temporalPassword = UserUtils.generateRandomPassword();
        newUser.setPassword(temporalPassword);
        String userImageURL = Optional.ofNullable(signupRequest.getImageURL())
                .filter(imageURL -> !imageURL.isEmpty())
                .orElse(IMAGE_URL_PREFIX + newUser.getUsername());
        newUser.setImageURL(userImageURL);
        Set<Role> userRole = userService.getRoles()
                .stream()
                .filter(role -> role.getName().equals(Roles.ROLE_USER.name()))
                .collect(Collectors.toSet());
        newUser.setRoles(userRole);
        userService.saveUser(newUser);
        emailService.composeAndSendSignupEmail(newUser);
    }

    @Override
    public LoginResponse refreshToken(RefreshTokenRequest token) {
        return jwtGeneratorService.refreshToken(token.getRefreshToken());
    }
}
