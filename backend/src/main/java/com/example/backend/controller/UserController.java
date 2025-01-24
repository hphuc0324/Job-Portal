package com.example.backend.controller;

import com.example.backend.dto.UserUpdateDTO;
import com.example.backend.model.User;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PatchMapping("/profile/{id}")
    public ResponseEntity<ResponseObject> updateProfile(
            @PathVariable(value = "id") UUID id,
            @Valid @RequestBody UserUpdateDTO userUpdateDTO) {

        User user = userService.updateUser(id, userUpdateDTO);

        return ResponseEntity.ok().body(ResponseObject
                .builder()
                .message("User updated successfully")
                .data(user)
                .status("200 - OK")
                .build());
    }
}
