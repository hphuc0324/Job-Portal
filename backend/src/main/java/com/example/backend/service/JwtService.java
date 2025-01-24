package com.example.backend.service;

import com.example.backend.model.Token;
import com.example.backend.model.User;
import com.example.backend.repository.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.*;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final TokenRepository tokenRepository;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private int expiration;

    @Value("${jwt.refresh-expiration}")
    private int refreshExpiration;

    public boolean validateToken(String token) {
        Optional<Token> foundToken = tokenRepository.findByToken(token);

        return foundToken.isPresent() && !foundToken.get().isRevoked() && foundToken.get().getExpirationDate().isAfter(Instant.now());
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("email", user.getEmail());
        claims.put("name", user.getName());

        try {
            String token = Jwts
                    .builder()
                    .subject(user.getEmail())
                    .claims(claims)
                    .expiration(new Date(System.currentTimeMillis() + expiration * 1000L))
                    .signWith(getKey())
                    .compact();

            return token;
        } catch (Exception e) {
            throw new RuntimeException("Error generating token", e);
        }
    }

    public Token addToken(String token, User user) {
        String refreshToken = UUID.randomUUID().toString();

        Token createdToken = Token.builder()
                .token(token)
                .expirationDate(Instant.now().plusSeconds(expiration))
                .refreshToken(refreshToken)
                .refreshExpirationDate(Instant.now().plusSeconds(refreshExpiration))
                .user(user)
                .build();

        return tokenRepository.save(createdToken);
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    public Date getExpirationDate(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String getEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public void revokeToken(String token) {
        Optional<Token> revokedToken = tokenRepository.findByToken(token);

        if (revokedToken.isEmpty()) {
            throw new RuntimeException("Token not found");
        }

        revokedToken.get().setRevoked(true);
        tokenRepository.save(revokedToken.get());
    }
}
