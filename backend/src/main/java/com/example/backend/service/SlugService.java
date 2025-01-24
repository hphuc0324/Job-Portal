package com.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SlugService {
    private final JobService jobService;
    private final CategoryService categoryService;
    private final LevelService levelService;

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
            case "jobs" -> jobService.existsBySlug(slug);
            case "levels" -> levelService.existsBySlug(slug);
            case "categories" -> categoryService.existsBySlug(slug);
            default -> false;
        };
    }
}
