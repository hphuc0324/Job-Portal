package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class UserExperienceDTO {
    private UUID id;

    @JsonProperty("start_date")
    @NotNull
    private Date startDate;

    @NotNull
    private String role;

    @JsonProperty("end_date")
    private Date endDate;

    @JsonProperty("is_currently_working")
    @NotNull
    private Boolean isCurrentlyWorking;

    @JsonProperty("company_id")
    @NotNull
    private UUID companyId;
}
