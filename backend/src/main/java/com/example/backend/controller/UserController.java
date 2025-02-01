package com.example.backend.controller;

import com.example.backend.annotation.IsProfileOwner;
import com.example.backend.dto.UserUpdateDTO;
import com.example.backend.exception.BadRequestException;
import com.example.backend.exception.DataNotFoundException;
import com.example.backend.model.User;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.CloudinaryService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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

    @Value("${cloudinary.user-avatar-folder}")
    private String userAvatarFolder;

    @PatchMapping("/profile/{id}")
    public ResponseEntity<ResponseObject> updateProfile(
            @PathVariable(value = "id") UUID id,
            @Valid @RequestBody UserUpdateDTO userUpdateDTO) {

        User user = userService.updateUser(id, userUpdateDTO);

        return ResponseEntity.ok().body(ResponseObject
                .builder()
                .message("User updated successfully")
                .data(user)
                .status(HttpStatus.OK)
                .build());
    }

    @PostMapping(path = "/profile/{id}/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @IsProfileOwner(idParam = "id")
    public ResponseEntity<ResponseObject> uploadAvatar(
            @PathVariable(value = "id") UUID id,
            @RequestPart("file") MultipartFile file){
       if(file == null){
           throw new DataNotFoundException("File is null");
       }

       String contentType = file.getContentType();

       if(contentType == null || !contentType.startsWith("image/")){
           throw new BadRequestException("File is not an image");
       }

        Map result = cloudinaryService.upload(file, userAvatarFolder);
        UserUpdateDTO userUpdateDTO = UserUpdateDTO.builder()
                .avatarUrl((String) result.get("url"))
                .build();

        User user = userService.updateUser(id, userUpdateDTO);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Upload avatar successfully")
                        .data(user)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
}
