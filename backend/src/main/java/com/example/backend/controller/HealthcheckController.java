package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;

@RestController
@RequestMapping("${api.prefix}/healthcheck")
public class HealthcheckController {

    @GetMapping
    public ResponseEntity<?> healthcheck() {
        try{
            String computerName = InetAddress.getLocalHost().getHostName();

            return ResponseEntity.ok().body("Successful, host name: " + computerName);
        } catch (UnknownHostException e) {
            return  ResponseEntity.badRequest().body("Failed to get host name");
        }
    }
}
