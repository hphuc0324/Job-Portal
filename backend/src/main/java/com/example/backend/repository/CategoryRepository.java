package com.example.backend.repository;

import com.example.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
     boolean existsBySlug(String slug);

     Optional<Category> findBySlug(String slug);

     Optional<Category> findByName(String categoryName);
}
