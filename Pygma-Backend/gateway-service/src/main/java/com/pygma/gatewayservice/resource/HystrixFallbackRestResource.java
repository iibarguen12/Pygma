package com.pygma.gatewayservice.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HystrixFallbackRestResource {

    @RequestMapping("/user-service/fallback")
    public ResponseEntity<String> getFallbackAuthServiceMsg() {
        return ResponseEntity.ok(standardFallbackMsg("User"));
    }

    private String standardFallbackMsg(String serviceName){
        return String.format("No response from %s Service, but could be back shortly", serviceName);
    }
}
