package com.example.backend.service;

import com.example.backend.dto.JobDTO;
import com.example.backend.dto.JobFilterDTO;
import com.example.backend.exception.DataNotFoundException;
import com.example.backend.mapper.JobMapper;
import com.example.backend.model.Job;
import com.example.backend.repository.JobRepository;
import com.example.backend.specification.JobSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final JobMapper jobMapper;

    public boolean existsBySlug(String slug){
        return jobRepository.existsBySlug(slug);
    }

    public List<Job> getAllJobsByCompany(UUID companyId){
        return jobRepository.findAllByCompanyId(companyId);
    }

    public Page<JobDTO> getFilteredJobs(Pageable pageable, JobFilterDTO filter){
        Specification<Job> specification = JobSpecification.withFilters(filter);

        Page<Job> jobs =  jobRepository.findAll(specification, pageable);

        return jobs.map(jobMapper::toJobDTO);
    }

    public JobDTO getJobBySlug(String slug){
        Optional<Job> job = jobRepository.findBySlug(slug);

        if(job.isEmpty()){
            throw new DataNotFoundException("Job not found");
        }

        return jobMapper.toJobDTO(job.get());
    }
}
