package com.example.backend.repository;

import com.example.backend.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LevelRepository extends JpaRepository<Level, UUID> {
    boolean existsBySlug(String slug);

    Optional<Level> findBySlug(String slug);

    Optional<Level> findByName(String name);
}
