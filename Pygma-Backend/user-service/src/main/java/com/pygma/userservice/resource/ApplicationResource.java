package com.pygma.userservice.resource;

import com.pygma.userservice.entity.Application;
import com.pygma.userservice.model.ApplicationRequest;
import com.pygma.userservice.model.SimpleResponse;
import com.pygma.userservice.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users/{username}/applications")
@Validated
public class ApplicationResource {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping
    public ResponseEntity<Application> getApplication (
            @PathVariable("username") String username) {
        Application application = applicationService.findApplicationByUsername(username);
        return new ResponseEntity<>(application, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SimpleResponse> saveApplication (
            @PathVariable("username") String username,
            @Valid @RequestBody ApplicationRequest applicationRequest) {

        Application application =
                Application.builder()
                        .data(applicationRequest.getApplicationData())
                        .username(username)
                        .build();

        applicationService.saveApplication(application);

        return new ResponseEntity<>(
                SimpleResponse.builder()
                        .statusCode(200)
                        .message("Application saved successfully for user " + username)
                        .build(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<SimpleResponse> updateApplication (
            @PathVariable("username") String username,
            @Valid @RequestBody ApplicationRequest applicationRequest) {

        Application newApplication =
                Application.builder()
                        .data(applicationRequest.getApplicationData())
                        .username(username)
                        .build();

        applicationService.updateApplication(newApplication, username);

        return new ResponseEntity<>(
                SimpleResponse.builder()
                        .statusCode(200)
                        .message("Application updated successfully for user " + username)
                        .build(), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<SimpleResponse> deleteApplication (
            @PathVariable("username") String username) {

        applicationService.deleteApplicationByUsername(username);

        return new ResponseEntity<>(
                SimpleResponse.builder()
                        .statusCode(200)
                        .message("Application deleted for user " + username)
                        .build(), HttpStatus.OK);
    }
}
