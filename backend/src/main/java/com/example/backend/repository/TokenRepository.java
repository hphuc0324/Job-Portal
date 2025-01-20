package com.example.backend.repository;

import com.example.backend.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface TokenRepository extends JpaRepository<Token, UUID> {

    Token findByToken(String token);
}
