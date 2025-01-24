package com.example.backend.controller;

import com.example.backend.dto.UserUpdateDTO;
import com.example.backend.model.User;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.CloudinaryService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final CloudinaryService cloudinaryService;

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

    @PostMapping(path = "/profile/{id}/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseObject> uploadAvatar(
            @PathVariable(value = "id") UUID id,
            @RequestPart("file") MultipartFile file){
       if(file == null){
           throw new RuntimeException("File is null");
       }

       String contentType = file.getContentType();

       if(contentType == null || !contentType.startsWith("image/")){
           throw new RuntimeException("File is not an image");
       }

        Map result = cloudinaryService.upload(file);
        UserUpdateDTO userUpdateDTO = UserUpdateDTO.builder()
                .avatarUrl((String) result.get("url"))
                .build();

        User user = userService.updateUser(id, userUpdateDTO);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Upload avatar successfully")
                        .data(user)
                        .status("200 - OK")
                        .build()
        );
    }
}
