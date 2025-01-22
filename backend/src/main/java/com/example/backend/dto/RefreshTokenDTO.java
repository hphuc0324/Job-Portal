package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefreshTokenDTO {

    @JsonProperty("refresh-token")
    private String refreshToken;
}
