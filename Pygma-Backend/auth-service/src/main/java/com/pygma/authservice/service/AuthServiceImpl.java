package com.pygma.authservice.service;

import com.pygma.authservice.config.JwtGenerator;
import com.pygma.authservice.entity.User;
import com.pygma.authservice.exception.NotFoundException;
import com.pygma.authservice.model.LoginRequest;
import com.pygma.authservice.model.LoginResponse;
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
    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userService.findUserByUsername(loginRequest.getUsername());
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new NotFoundException("User not found");
        }
        return jwtGenerator.generateToken(user);
    }
}
