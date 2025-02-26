package com.example.backend.service;

import com.example.backend.model.Job;
import com.example.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;

    public boolean existsBySlug(String slug){
        return jobRepository.existsBySlug(slug);
    }

    public List<Job> getAllJobsByCompany(UUID companyId){
        return jobRepository.findAllByCompanyId(companyId);
    }
}
