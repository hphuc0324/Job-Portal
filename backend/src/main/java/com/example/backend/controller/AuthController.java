package com.example.backend.controller;


import com.example.backend.dto.UserLoginDTO;
import com.example.backend.dto.UserRegisterDTO;
import com.example.backend.model.User;
import com.example.backend.response.LoginResponse;
import com.example.backend.response.RegisterResponse;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@Valid @RequestBody UserLoginDTO userLoginDTO){
        String token = userService.login(userLoginDTO);
        User user = userService.getUserDetailsFromToken(token);
        jwtService.addToken(token, user);

        LoginResponse loginResponse = LoginResponse.builder()
                .token(token)
                .build();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Login successfully")
                        .data(loginResponse)
                        .status("200 - OK")
                        .build()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseObject> register(@Valid @RequestBody UserRegisterDTO userRegisterDTO){
        User user = userService.register(userRegisterDTO);

        RegisterResponse registerResponse = RegisterResponse.builder()
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().getRoleName())
                .build();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Register successfully")
                        .data(registerResponse)
                        .status("200 - OK")
                        .build()
        );
    }
}
