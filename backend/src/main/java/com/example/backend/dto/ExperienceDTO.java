package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class ExperienceDTO {
    private UUID id;
    private String role;
    private Date startDate;
    private Date endDate;
    private boolean isCurrentlyWorking;
    private UserDTO company;
    private String location;
}
