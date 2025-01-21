package com.example.backend.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterResponse {
    private String email;
    private String name;
    private String role;
}
