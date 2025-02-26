package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserUpdateDTO {
    private String name;
    private String avatarUrl;
    private String job;
    private String location;
    private String description;
    private Integer experience;
    private String skills;
    private String status;
}
