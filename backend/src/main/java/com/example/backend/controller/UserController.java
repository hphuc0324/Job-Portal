package com.example.backend.controller;

import com.example.backend.annotation.IsProfileOwner;
import com.example.backend.dto.*;
import com.example.backend.exception.BadRequestException;
import com.example.backend.exception.DataNotFoundException;
import com.example.backend.model.User;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.CloudinaryService;
import com.example.backend.service.ExperienceService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final CloudinaryService cloudinaryService;
    private final ExperienceService experienceService;

    @Value("${cloudinary.user-avatar-folder}")
    private String userAvatarFolder;

    @GetMapping("/profile/{id}")
    public ResponseEntity<ResponseObject> getProfile(
            @PathVariable(value = "id") UUID id
    ) {
        UserDetailsDTO userDetails = userService.getUserDetails(id);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .message("Get profile successfully")
                        .status(HttpStatus.OK)
                        .data(userDetails)
                        .build()
        );
    }

    @PatchMapping("/profile/{id}")
    @IsProfileOwner(idParam = "id")
    public ResponseEntity<ResponseObject> updateProfile(
            @PathVariable(value = "id") UUID id,
            @Valid @RequestBody UserUpdateDTO userUpdateDTO) {

        System.out.println(userUpdateDTO);
        User user = userService.updateUser(id, userUpdateDTO);
        UserDetailsDTO userDetails = userService.getUserDetails(id);

        return ResponseEntity.ok().body(ResponseObject
                .builder()
                .message("User updated successfully")
                .data(userDetails)
                .status(HttpStatus.OK)
                .build());
    }

    @PostMapping(path = "/profile/{id}/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @IsProfileOwner(idParam = "id")
    public ResponseEntity<ResponseObject> uploadAvatar(
            @PathVariable(value = "id") UUID id,
            @RequestPart("file") MultipartFile file) {
        if (file == null) {
            throw new DataNotFoundException("File is null");
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
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

    @PostMapping(path = "/profile/{id}/experiences")
    @IsProfileOwner(idParam = "id")
    public ResponseEntity<ResponseObject> updateExperiences(
            @PathVariable(value = "id") UUID id,
            @RequestBody List<UserExperienceDTO> userExperienceDTOs
    ) {

        experienceService.processExperience(userExperienceDTOs, id);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Update experiences successfully")
                        .status(HttpStatus.OK)
                        .data(userExperienceDTOs)
                        .build()
        );
    }

    @GetMapping(path = "/getAll")
    public ResponseEntity<ResponseObject> getUsers(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "experience", required = false, defaultValue = "0") Integer experience,
            @RequestParam(name = "role", required = false, defaultValue = "applicant") String role,
            @RequestParam(name = "location", required = false) String location,
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "limit", required = false, defaultValue = "5") Integer limit
    ) {

        Pageable pageable = PageRequest.of(page, limit);
        UserFilterDTO filter = UserFilterDTO.builder()
                .name(name)
                .location(location)
                .experience(experience)
                .roleName(role)
                .build();

        Page<UserDTO> users = userService.getFilteredUsers(pageable, filter);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .data(users)
                        .message("Get users successfully")
                        .build()
        );
    }
}
