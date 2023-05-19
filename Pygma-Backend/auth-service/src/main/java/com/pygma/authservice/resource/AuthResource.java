package com.pygma.authservice.resource;

import com.pygma.authservice.model.LoginRequest;
import com.pygma.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class AuthResource {
    @Autowired
    private AuthService authService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(authService.login(loginRequest), HttpStatus.OK);
    }
}
