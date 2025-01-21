package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserRegisterDTO {

    @Email(message = "Invalid email")
    private String email;

    @Min(message = "Password must contain at least 6 characters", value = 6)
    private String password;

    @Size(message = "Name must contain at most 50 characters", max = 50)
    @Size(message = "Name must contain at least 2 character", min = 2)
    private String name;

    @NotNull(message = "Invalid role")
    private String role;
}
