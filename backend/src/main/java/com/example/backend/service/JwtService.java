package com.example.backend.service;

import com.example.backend.model.Token;
import com.example.backend.model.User;
import com.example.backend.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final TokenRepository tokenRepository;

    public boolean validateToken(String token){


        return false;
    }

    public String generateToken(){
        return "new-token";
    }

    public void addToken(String token, User user){
        Token createdToken = Token.builder()
                .token(token)
                .expirationDate(Instant.now())
                .refreshToken("some-refresh-token")
                .refreshExpirationDate(Instant.now())
                .user(user)
                .build();

        tokenRepository.save(createdToken);
    }
}
