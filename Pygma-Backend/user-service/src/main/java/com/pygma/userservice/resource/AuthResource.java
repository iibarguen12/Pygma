package com.pygma.userservice.resource;

import com.pygma.userservice.model.LoginRequest;
import com.pygma.userservice.model.RefreshTokenRequest;
import com.pygma.userservice.model.SignupRequest;
import com.pygma.userservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
@Validated
public class AuthResource {
    @Autowired
    private AuthService authService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(authService.login(loginRequest), HttpStatus.OK);
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        return new ResponseEntity<>(authService.signup(signupRequest), HttpStatus.OK);
    }

    @PostMapping("/auth/token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return new ResponseEntity<>(authService.refreshToken(refreshTokenRequest), HttpStatus.OK);
    }
}
