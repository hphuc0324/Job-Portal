package com.example.backend.controller;

import com.example.backend.model.Category;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<ResponseObject> getCategories(){
        List<Category> categories = categoryService.getAllCategories();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get categories successfully")
                        .data(categories)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
}
