package com.example.backend.controller;

import com.example.backend.model.Level;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/level")
@RequiredArgsConstructor
public class LevelController {
    private final LevelService levelService;

    @GetMapping()
    public ResponseEntity<ResponseObject> getLevels(){
        List<Level> levels = levelService.getAllLevels();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get levels successfully")
                        .data(levels)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
}
