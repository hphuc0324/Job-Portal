package com.example.backend.service;


import com.example.backend.model.Level;
import com.example.backend.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LevelService {
    private final LevelRepository levelRepository;

    public boolean existsBySlug(String slug) {
        return levelRepository.existsBySlug(slug);
    }

    public List<Level> getAllLevels() {
        return levelRepository.findAll();
    }
}
