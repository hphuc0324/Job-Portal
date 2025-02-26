package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class JobDTO {
    private UUID id;
    private String title;
    private String location;
    private String slug;
    private String description;
    private String status;
    private Integer salary;
    private UserDTO company;
    private String type;
    private String level;
}
