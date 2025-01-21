package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tokens")
public class Token {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "token")
    private String token;

    @Column(name = "expiration_date")
    private Instant expirationDate;

    @Column(name = "revoked")
    private boolean revoked;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_expiration_date")
    private Instant refreshExpirationDate;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
