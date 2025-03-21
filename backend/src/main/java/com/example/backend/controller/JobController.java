package com.example.backend.controller;

import com.example.backend.annotation.IsJobOwner;
import com.example.backend.dto.JobDTO;
import com.example.backend.dto.JobFilterDTO;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/job")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ResponseObject> getJob(
            @PathVariable String slug) {

        JobDTO job = jobService.getJobBySlug(slug);

        return ResponseEntity.ok()
                .body(ResponseObject.builder()
                        .message("Get job successfully")
                        .data(job)
                        .status(HttpStatus.OK)
                        .build());
    }

    @PatchMapping("/{slug}")
    @IsJobOwner(idParam = "slug")
    public ResponseEntity<ResponseObject> updateJob(@PathVariable String slug, @RequestBody JobDTO jobDTO) {
        JobDTO updatedJob = jobService.updateJob(slug, jobDTO);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Update job successfully")
                        .data(updatedJob)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PostMapping()
    public ResponseEntity<ResponseObject> createJob(@RequestBody JobDTO jobDTO) {
        JobDTO createdJob = jobService.createJob(jobDTO);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Create job successfully")
                        .data(createdJob)
                        .status(HttpStatus.CREATED)
                        .build()
        );
    }

    @GetMapping()
    public ResponseEntity<ResponseObject> getJobs(
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "location", required = false) String location,
            @RequestParam(name = "type", required = false) List<String> type,
            @RequestParam(name = "minSalary", required = false) Integer minSalary,
            @RequestParam(name = "maxSalary", required = false) Integer maxSalary,
            @RequestParam(name = "categories", required = false) List<String> categories,
            @RequestParam(name = "level", required = false) String level,
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "limit", required = false, defaultValue = "0") Integer limit
            ){
        JobFilterDTO filter = JobFilterDTO.builder()
                .title(title)
                .location(location)
                .type(type)
                .minSalary(minSalary)
                .maxSalary(maxSalary)
                .categories(categories)
                .level(level)
                .build();

        Pageable pageable = PageRequest.of(page, limit);

        Page<JobDTO> jobs = jobService.getFilteredJobs(pageable, filter);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get jobs successfully")
                        .data(jobs)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @GetMapping("/company-jobs/{id}")
    public ResponseEntity<ResponseObject> getCompanyJobs(
            @PathVariable(name = "id") UUID id
    ) {

        List<JobDTO> jobs = jobService.getCompanyJobs(id);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get company jobs successfully")
                        .data(jobs)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
}
