package com.example.backend.repository;

import com.example.backend.model.FavoriteJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FavoriteJobRepository extends JpaRepository<FavoriteJob, UUID> {
    List<FavoriteJob> findAllByUserId(UUID userId);

    FavoriteJob findByUserIdAndJobId(UUID userId, UUID jobId);
}
