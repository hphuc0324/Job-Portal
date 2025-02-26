package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserDetailsDTO {
    private String name;
    private String job;
    private String about;
    private String skills;
    private Integer experience;
    private String description;
    private List<UserExperienceDTO> experiences;
    private String role;
    private List<JobDTO> jobs;
}
