package com.pygma.authservice.controller;


import com.pygma.authservice.entity.User;
import com.pygma.authservice.mapper.UserMapper;
import com.pygma.authservice.model.SignupRequest;
import com.pygma.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@RestController
@RequestMapping("/api/user/")
@Validated
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> response = userService.getUsers();
        return response.isEmpty() ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND):
                new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> saveUser(@Valid @RequestBody SignupRequest request) {
        Optional<User> savedUser = Optional.of(userService.saveUser(UserMapper.mapSignupRequestToUser(request)));
        return savedUser.isPresent() ?
                new ResponseEntity<>(savedUser.get(), HttpStatus.OK):
                new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
