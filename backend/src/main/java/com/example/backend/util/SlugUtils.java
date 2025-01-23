package com.example.backend.util;

import com.example.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SlugUtils {
    private final JobService jobService;

    public  String generateSlug(String input, String tableName){
        String baseSlug = input.toLowerCase()
                .replaceAll("[^a-z0-9]", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
        String uniqueSlug = baseSlug;
        int countExistingSlug = 0;

        while(this.isSlugExists(uniqueSlug, tableName)){
            countExistingSlug++;
            uniqueSlug = baseSlug + "-" + countExistingSlug;
        }

        return uniqueSlug;
    }

    private boolean isSlugExists(String slug, String tableName){
        return switch (tableName) {
            case "jobs" -> jobService.existsJobsBySlug(slug);
            case "applications" -> true;
            case "categories" -> true;
            default -> false;
        };
    }
}
