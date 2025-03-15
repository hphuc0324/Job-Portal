package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ApplicationCreateDTO {
    private String email;

    private String phoneNumber;

    private UUID userId;

    private UUID jobId;

    private String coverLetter;

    private String resumeUrl;
}
