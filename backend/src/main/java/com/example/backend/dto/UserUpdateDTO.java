package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserUpdateDTO {
    private String name;
    private String avatarUrl;
    private String job;
    private String location;
    private Integer experience;
    private String skills;
    private String status;
}
