package com.example.backend.service;

import com.example.backend.exception.DataNotFoundException;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${security.oauth2.client.registration.google.google-auth-url}")
    private String googleAuthUrl;

    @Value("${security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${security.oauth2.client.registration.google.redirect-url}")
    private String googleRedirectUrl;

    @Value("${security.oauth2.client.registration.google.user-info-url}")
    private String googleUserInfoUrl;

    public boolean isNewSocialLogin(String email){
        Optional<User> foundUser = userRepository.findByEmail(email);

        return foundUser.isEmpty();
    }

    public String authenticateSocialUser(String email){
        Optional<User> foundUser = userRepository.findByEmail(email);

        if(foundUser.isEmpty()){
            throw new DataNotFoundException("User not found");
        }

        User user = foundUser.get();

        if(Objects.equals(user.getStatus(), "blocked")){
            throw new RuntimeException("User is blocked");
        }

       return jwtService.generateToken(user);
    }


    public String generateAuthUrl(String loginType, String role){
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
                        .queryParam("role", role)
                        .toUriString();
            default:
                return null;
        }
    }

    public Map<String, String> fetchUserInfo(String loginType, String code) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        String accessToken;

        switch (loginType){
            case "google":
                accessToken = new GoogleAuthorizationCodeTokenRequest(
                        new NetHttpTransport(),
                        new GsonFactory(),
                        googleClientId,
                        googleClientSecret,
                        code,
                        googleRedirectUrl
                ).execute().getAccessToken();

                restTemplate.getInterceptors().add(
                        ((request, body, execution) -> {
                            request.getHeaders().set("Authorization", "Bearer " + accessToken);
                            return  execution.execute(request, body);
                        })
                );

               return new ObjectMapper().readValue(
                        restTemplate.getForEntity(googleUserInfoUrl, String.class).getBody(),
                        new TypeReference<>(){}
                );

            default:
                return new HashMap<>();
        }
    }
}
