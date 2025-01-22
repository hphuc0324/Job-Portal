package com.example.backend.controller;


import com.example.backend.dto.RefreshTokenDTO;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.dto.UserRegisterDTO;
import com.example.backend.model.Token;
import com.example.backend.model.User;
import com.example.backend.response.LoginResponse;
import com.example.backend.response.RegisterResponse;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
        Token createdToken = jwtService.addToken(token, user);

        LoginResponse loginResponse = LoginResponse.builder()
                .token(createdToken.getToken())
                .refreshToken(createdToken.getRefreshToken())
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


    @PostMapping("refresh-token")
    public ResponseEntity<ResponseObject> refresh(@Valid @RequestBody RefreshTokenDTO refreshTokenDTO, HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            throw new RuntimeException("Unauthorized");
        }

        String token = authHeader.split("Bearer ")[1];
        User user = userService.getUserDetailsFromToken(token);
        String newToken = userService.refreshToken(token, refreshTokenDTO);
        Token createdToken = jwtService.addToken(newToken, user);

        LoginResponse loginResponse = LoginResponse.builder()
                .token(createdToken.getToken())
                .refreshToken(createdToken.getRefreshToken())
                .build();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Refresh successfully")
                        .data(loginResponse)
                        .status("200 - OK")
                        .build()
        );
    }
}
