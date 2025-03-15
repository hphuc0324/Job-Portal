package com.example.backend.service;

import com.example.backend.dto.JobDTO;
import com.example.backend.dto.JobFilterDTO;
import com.example.backend.exception.DataNotFoundException;
import com.example.backend.mapper.JobMapper;
import com.example.backend.model.Category;
import com.example.backend.model.Job;
import com.example.backend.model.Level;
import com.example.backend.model.User;
import com.example.backend.repository.JobRepository;
import com.example.backend.specification.JobSpecification;
import jakarta.persistence.EntityManager;
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
    private final CategoryService categoryService;
    private final LevelService levelService;
    private final SlugService slugService;

    private final EntityManager entityManager;

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
        Optional<Job> foundJob = jobRepository.findBySlug(slug);

        if(foundJob.isEmpty()){
            throw new DataNotFoundException("Job not found");
        }

        return jobMapper.toJobDTO(foundJob.get());
    }

    public Job findById(UUID id){
        Optional<Job> foundJob = jobRepository.findById(id);
        if(foundJob.isEmpty()){
            throw new DataNotFoundException("Job not found");
        }

        return foundJob.get();
    }

    public JobDTO updateJob(String slug, JobDTO jobDTO){
        Optional<Job> foundJob = jobRepository.findBySlug(slug);

        if(foundJob.isEmpty()){
            throw new DataNotFoundException("Job not found");
        }

        Job job = foundJob.get();

        jobMapper.updateJob(jobDTO, job);

        if(jobDTO.getCategory() != null){
            Optional<Category> foundCategory = categoryService.getCategoryByName(jobDTO.getCategory());
            if(foundCategory.isEmpty()){
                throw new DataNotFoundException("Category not found");
            }

            job.setCategory(foundCategory.get());
        }

        if(jobDTO.getLevel() != null){
            Optional<Level> foundLevel = levelService.getLevelByName(jobDTO.getLevel());

            if(foundLevel.isEmpty()){
                throw new DataNotFoundException("Level not found");
            }

            job.setLevel(foundLevel.get());
        }

        Job updatedJob = jobRepository.save(job);
        return jobMapper.toJobDTO(updatedJob);
    }

    public JobDTO createJob(JobDTO jobDTO){
        Job job = new Job();

        job.setTitle(jobDTO.getTitle());
        job.setSlug(slugService.generateSlug(jobDTO.getTitle(), "jobs"));
        job.setLocation(jobDTO.getLocation());
        job.setDescription(jobDTO.getDescription());
        job.setBenefit(jobDTO.getBenefit());
        job.setRequirement(jobDTO.getRequirement());
        job.setResponsibility(jobDTO.getResponsibility());
        job.setSalary(jobDTO.getSalary());
        job.setType(jobDTO.getType());
        job.setCompany(entityManager.getReference(User.class, jobDTO.getCompany().getId()));
        job.setCategory(categoryService.getCategoryByName(jobDTO.getCategory()).get());
        job.setLevel(levelService.getLevelByName(jobDTO.getLevel()).get());
        job.setNumberOfApplicants(0);
        job.setStatus(jobDTO.getStatus());

        Job createdJob = jobRepository.save(job);
        return jobMapper.toJobDTO(createdJob);
    }
}
