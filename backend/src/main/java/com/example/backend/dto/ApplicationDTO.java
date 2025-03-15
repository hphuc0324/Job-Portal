package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationDTO {
    private String id;

    private String email;

    private String coverLetter;

    private String resume;

    private String status;

    private String phoneNumber;

    private UserDTO user;

    private JobDTO job;
}
