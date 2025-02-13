package com.example.backend.controller;


import com.example.backend.dto.RefreshTokenDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.dto.UserRegisterDTO;
import com.example.backend.exception.BadRequestException;
import com.example.backend.exception.UnauthorizedAccessException;
import com.example.backend.model.Token;
import com.example.backend.model.User;
import com.example.backend.response.LoginResponse;
import com.example.backend.response.RegisterResponse;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.AuthService;
import com.example.backend.service.JwtService;
import com.example.backend.service.TokenService;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthService authService;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@Valid @RequestBody UserLoginDTO userLoginDTO) {
        String token = userService.login(userLoginDTO);
        User user = userService.getUserDetailsFromToken(token);
        Token createdToken = jwtService.addToken(token, user);

        LoginResponse loginResponse = LoginResponse.builder()
                .token(createdToken.getToken())
                .refreshToken(createdToken.getRefreshToken())
                .user(UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .avatarUrl(user.getAvatarUrl())
                        .role(user.getRole().getRoleName())
                        .build())
                .build();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Login successfully")
                        .data(loginResponse)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseObject> register(@Valid @RequestBody UserRegisterDTO userRegisterDTO) {
        User user = userService.register(userRegisterDTO);

        RegisterResponse registerResponse = RegisterResponse.builder()
                .user(
                        UserDTO.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .avatarUrl(user.getAvatarUrl())
                                .role(user.getRole().getRoleName())
                                .build()
                )
                .build();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Register successfully")
                        .data(registerResponse)
                        .status(HttpStatus.OK)
                        .build()
        );
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<ResponseObject> refresh(@Valid @RequestBody RefreshTokenDTO refreshTokenDTO, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedAccessException("Unauthorized");
        }

        String token = authHeader.split("Bearer ")[1];
        User user = userService.getUserDetailsFromRefreshToken(refreshTokenDTO.getRefreshToken());
        String newToken = userService.refreshToken(token, refreshTokenDTO, user);
        Token createdToken = jwtService.addToken(newToken, user);

        LoginResponse loginResponse = LoginResponse.builder()
                .token(createdToken.getToken())
                .refreshToken(createdToken.getRefreshToken())
                .build();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Refresh successfully")
                        .data(loginResponse)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @GetMapping("/social-login")
    public ResponseEntity<ResponseObject> socialLogin(@RequestParam("login_type") String loginType, @RequestParam(value = "role", required = false) String role) {
        String url = authService.generateAuthUrl(loginType, role);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Social login url created successfully")
                        .data(url)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @GetMapping("/social/callback")
    public ResponseEntity<ResponseObject> socialCallback(@RequestParam String code, @RequestParam(value = "login_type") String loginType, @RequestParam(required = false) String role) throws IOException {

        Map<String, String> userInfo = authService.fetchUserInfo(loginType, code);
        if(authService.isNewSocialLogin(userInfo.get("email"))){
            if(role.isEmpty()){
                throw new UnauthorizedAccessException("Unauthorized");
            }

            if(loginType.equals("google")){
                UserRegisterDTO userRegisterDTO = UserRegisterDTO.builder()
                        .name(userInfo.get("name"))
                        .email(userInfo.get("email"))
                        .password("")
                        .avatarUrl(userInfo.get("picture"))
                        .googleAccountId(userInfo.get("sub"))
                        .role(role)
                        .build();
                userService.register(userRegisterDTO);
            }
        } else{
            if(!Objects.equals(role, "null")){
                System.out.println(role);
                throw new BadRequestException("Email already in use");
            }
        }

        String token = authService.authenticateSocialUser(userInfo.get("email"));
        User user = userService.getUserDetailsFromToken(token);
        Token createdToken = jwtService.addToken(token, user);

        LoginResponse loginResponse = LoginResponse.builder()
                .token(createdToken.getToken())
                .refreshToken(createdToken.getRefreshToken())
                .user(UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .avatarUrl(user.getAvatarUrl())
                        .role(user.getRole().getRoleName())
                        .build())
                .build();

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Social login successfully")
                        .data(loginResponse)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
}
