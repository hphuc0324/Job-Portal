package com.example.backend.service;

import com.example.backend.dto.ApplicationCreateDTO;
import com.example.backend.dto.ApplicationDTO;
import com.example.backend.dto.JobDTO;
import com.example.backend.mapper.ApplicationMapper;
import com.example.backend.model.Application;
import com.example.backend.model.Job;
import com.example.backend.repository.ApplicationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final JobService jobService;
    private final UserService userService;
    private final ApplicationMapper applicationMapper;

    @Transactional
    public ApplicationDTO createApplication(ApplicationCreateDTO applicationCreateDTO) {
        Application application = new Application();
        Job job = jobService.findById(applicationCreateDTO.getJobId());

        application.setEmail(applicationCreateDTO.getEmail());
        application.setResume(applicationCreateDTO.getResumeUrl());
        application.setStatus("pending");
        application.setCoverLetter(applicationCreateDTO.getCoverLetter());
        application.setPhoneNumber(applicationCreateDTO.getPhoneNumber());
        application.setJob(job);
        application.setUser(userService.findById(applicationCreateDTO.getUserId()));
        application.setStatus("pending");

        JobDTO jobDTO = JobDTO.builder()
                .numberOfApplicants(job.getNumberOfApplicants())
                .build();

        jobService.updateJob(job.getSlug(), jobDTO);

        return applicationMapper.toApplicationDTO(applicationRepository.save(application));
    }

    public List<ApplicationDTO> getJobApplications(String slug) {
        List<Application> applications = applicationRepository.findAllByJobSlug(slug);

        return applications.stream().map(applicationMapper::toApplicationDTO).collect(Collectors.toList());
    }

    public ApplicationDTO updateApplication(UUID id,ApplicationDTO applicationDTO) {
        Application application = applicationRepository.findById(id).get();

        applicationMapper.updateApplication(applicationDTO, application);

        return applicationMapper.toApplicationDTO(applicationRepository.save(application));
    }
}
