package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.UUID;

@Service
public class AuthService {
    @Value("${security.oauth2.client.registration.google.google-auth-url}")
    private String googleAuthUrl;

    @Value("${security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${security.oauth2.client.registration.google.redirect-url}")
    private String googleRedirectUrl;

    public String generateAuthUrl(String loginType){
        switch (loginType){
            case "google":
                return UriComponentsBuilder
                        .fromUriString(googleAuthUrl)
                        .queryParam("client_id", googleClientId)
                        .queryParam("redirect_uri", googleRedirectUrl)
                        .queryParam("scope", "email profile")
                        .queryParam("access_type", "offline")
                        .queryParam("response_type", "code")
                        .queryParam("state", UUID.randomUUID().toString())
                        .toUriString();
            default:
                return null;
        }
    }

}
