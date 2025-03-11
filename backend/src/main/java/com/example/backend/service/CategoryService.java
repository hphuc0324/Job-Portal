package com.example.backend.service;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public boolean existsBySlug(String slug){
        return categoryRepository.existsBySlug(slug);
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryBySlug(String slug){
        return categoryRepository.findBySlug(slug);
    }

    public Optional<Category> getCategoryByName(String categoryName){
        return categoryRepository.findByName(categoryName);
    }
}
