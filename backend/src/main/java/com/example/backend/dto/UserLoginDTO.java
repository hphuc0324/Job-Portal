package com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserLoginDTO {

    @Email(message = "Invalid email")
    private String email;

    @NotNull(message = "Password must not be empty")
    private String password;
}
