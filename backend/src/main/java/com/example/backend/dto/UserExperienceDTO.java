package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class UserExperienceDTO {
    private UUID id;

    @NotNull
    private Date startDate;

    @NotNull
    private String role;

    private Date endDate;

    private String location;

    @NotNull
    private Boolean isCurrentlyWorking;

    @NotNull
    private UserDTO company;
}
