package com.example.backend.service;

import com.example.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;

    public boolean existsJobsBySlug(String slug){
        return jobRepository.existsJobsBySlug(slug);
    }
}
