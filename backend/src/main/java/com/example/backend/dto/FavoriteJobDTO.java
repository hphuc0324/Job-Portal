package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class FavoriteJobDTO {
    private UUID id;

    private UUID userId;

    private UUID jobId;

}
