package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class JobFilterDTO {
    private String title;
    private String location;
    private String level;
    private List<String> categories;
    private List<String> type;
    private Integer minSalary;
    private Integer maxSalary;
}
