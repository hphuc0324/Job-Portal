package com.example.backend.repository;

import com.example.backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, UUID> {

    List<Application> findAllByJobId(UUID jobId);

    List<Application> findAllByJobSlug(String jobSlug);
}
