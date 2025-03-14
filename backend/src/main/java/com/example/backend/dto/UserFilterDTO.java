package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserFilterDTO {
    private String name;
    private String location;
    private int experience;
    private String roleName;
    private Integer minExperience;
    private Integer maxExperience;
    private List<String> skills;
}
