package com.pygma.userservice.resource;


import com.pygma.userservice.entity.Application;
import com.pygma.userservice.entity.User;
import com.pygma.userservice.model.SimpleResponse;
import com.pygma.userservice.model.UpdatePasswordRequest;
import com.pygma.userservice.service.ApplicationService;
import com.pygma.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
@Validated
public class UserResource {
    @Autowired
    private UserService userService;
    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> response = userService.getUsers();

        return response.stream()
                .findFirst()
                .map(user -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElse(ResponseEntity.noContent().build());
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

    @PutMapping("/users/{username}/password")
    public ResponseEntity<User> updatePassword(@PathVariable("username") String username,
                                           @Valid @RequestBody UpdatePasswordRequest updatePasswordRequest) {
        return new ResponseEntity<>(
                userService.updateUserPassword(username, updatePasswordRequest),
                HttpStatus.OK);
    }

    @PutMapping("/users/{username}/image")
    public ResponseEntity<User> updateImage(@PathVariable("username") String username,
                                            @RequestParam("image") MultipartFile image) {
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(
                userService.updateUserImage(username, image),
                HttpStatus.OK);
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

    @GetMapping("/users/applications")
    public ResponseEntity<List<Application>> getApplications (){
        List<Application> applications = applicationService.getApplications();
        return applications.stream()
                .findFirst()
                .map(application -> new ResponseEntity<>(applications, HttpStatus.OK))
                .orElse(ResponseEntity.noContent().build());
    }
}
