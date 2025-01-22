package com.example.backend.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String token;

    @JsonProperty("refresh-token")
    private String refreshToken;
}
