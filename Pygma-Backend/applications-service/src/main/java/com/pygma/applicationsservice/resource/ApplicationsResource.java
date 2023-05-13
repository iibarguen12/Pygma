package com.pygma.applicationsservice.resource;

import com.pygma.applicationsservice.entity.Application;
import com.pygma.applicationsservice.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ApplicationsResource {
    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getAllApplications(
            @RequestParam(required = false) String name){
        try{
            List<Application> applications = new ArrayList<>();
            if (name == null)
                applications.addAll(applicationRepository.findAll());
            else
                applications.addAll(applicationRepository.findByNameContaining(name));

            if (applications.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(applications, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/applications/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable("id") long id) {
        Optional<Application> applicationData = applicationRepository.findById(id);
        return applicationData.map(application -> new ResponseEntity<>(application, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/applications")
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        try {
            Application _application = applicationRepository.save(application);
            return new ResponseEntity<>(_application, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/applications/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable("id") long id, @RequestBody Application application) {
        Optional<Application> applicationData = applicationRepository.findById(id);

        if (applicationData.isPresent()) {
            Application _application = applicationData.get();
            _application.setName(application.getName());
            _application.setType(application.getType());
            _application.setColor(application.getColor());
            _application.setCost(application.getCost());
            _application.setWeight(application.getWeight());
            _application.setQuantity(application.getQuantity());
            return new ResponseEntity<>(applicationRepository.save(_application), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<HttpStatus> deleteApplication(@PathVariable("id") long id) {
        try {
            applicationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
