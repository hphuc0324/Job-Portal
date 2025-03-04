package com.example.backend.service;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
