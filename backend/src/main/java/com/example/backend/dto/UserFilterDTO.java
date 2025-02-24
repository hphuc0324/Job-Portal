package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserFilterDTO {
    private String name;
    private String location;
    private int yearExperience;
    private String roleName;
}
