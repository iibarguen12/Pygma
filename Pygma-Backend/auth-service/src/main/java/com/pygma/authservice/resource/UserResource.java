package com.pygma.authservice.resource;


import com.pygma.authservice.entity.User;
import com.pygma.authservice.model.SimpleResponse;
import com.pygma.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
@Validated
public class UserResource {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> response = userService.getUsers();
        return response.isEmpty() ?
                new ResponseEntity<>(HttpStatus.NO_CONTENT):
                new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        User response = userService.findUserByUsername(username);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@Valid @RequestBody User user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    @PutMapping("/users/{username}")
    public ResponseEntity<User> updateUser(@PathVariable("username") String username,
                                           @Valid @RequestBody User user) {
        return new ResponseEntity<>(userService.updateUser(user, username), HttpStatus.OK);
    }

    @DeleteMapping("/users/{username}")
    public ResponseEntity<SimpleResponse> deleteUser(@PathVariable("username") String username) {
        userService.deleteUserByUsername(username);
        return new ResponseEntity<>(
                SimpleResponse.builder()
                .statusCode(200)
                .message("User deleted successfully")
                .build(),HttpStatus.OK);
    }
}
