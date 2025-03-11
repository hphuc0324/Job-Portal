package com.example.backend.service;

import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.JobRepository;
import com.example.backend.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SlugService {
    private final JobRepository jobRepository;
    private final CategoryRepository categoryRepository;
    private final LevelRepository levelRepository;

    public String generateSlug(String input, String tableName){
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
            case "jobs" -> jobRepository.existsBySlug(slug);
            case "levels" -> levelRepository.existsBySlug(slug);
            case "categories" -> categoryRepository.existsBySlug(slug);
            default -> false;
        };
    }
}
