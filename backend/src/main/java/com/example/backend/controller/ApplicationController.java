package com.example.backend.controller;

import com.example.backend.dto.ApplicationCreateDTO;
import com.example.backend.dto.ApplicationDTO;
import com.example.backend.exception.BadRequestException;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.ApplicationService;
import com.example.backend.service.CloudinaryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/application")
public class ApplicationController {
    @Value("${cloudinary.user-resume-folder}")
    private String resumeFolder;

    private final CloudinaryService cloudinaryService;
    private final ApplicationService applicationService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseObject> addApplication(
            @RequestPart("application") @Valid ApplicationCreateDTO application,
            @RequestPart(value = "resume", required = false) MultipartFile resume
            ){
        if(resume == null){
            throw new BadRequestException("Resume is null");
        }

        String contentType = resume.getContentType();

        if(contentType == null){
            throw new BadRequestException("Content type is null");
        }

        Map result = cloudinaryService.upload(resume, resumeFolder);
        application.setResumeUrl((String) result.get("url"));

        ApplicationDTO createdApplication = applicationService.createApplication(application);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .message("Create application successfully")
                        .data(createdApplication)
                        .status(HttpStatus.CREATED)
                        .build()
        );
    }

    @GetMapping("/job-applications/{slug}")
    public ResponseEntity<ResponseObject> getJobApplications(
            @PathVariable(name = "slug") String slug){

        List<ApplicationDTO> applications = applicationService.getJobApplications(slug);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get job applications successfully")
                        .data(applications)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @GetMapping("/user-applications/{id}")
    public ResponseEntity<ResponseObject> getUserApplications(
            @PathVariable(name = "id") UUID id
    ) {
        List<ApplicationDTO> applications = applicationService.getUserApplications(id);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get user application successfully")
                        .data(applications)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResponseObject> updateApplication(
            @PathVariable(name = "id") UUID id,
            @RequestBody ApplicationDTO application
    ) {
        ApplicationDTO updatedApplication = applicationService.updateApplication(id, application);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Update application successfully")
                        .data(updatedApplication)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
}
