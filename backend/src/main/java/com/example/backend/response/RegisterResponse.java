package com.example.backend.response;

import com.example.backend.dto.UserDTO;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterResponse {
    private UserDTO user;
}
