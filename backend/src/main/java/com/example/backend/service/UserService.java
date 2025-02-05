package com.example.backend.service;

import com.example.backend.dto.RefreshTokenDTO;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.dto.UserRegisterDTO;
import com.example.backend.dto.UserUpdateDTO;
import com.example.backend.exception.BadRequestException;
import com.example.backend.exception.DataNotFoundException;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.WrongCredentialsException;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.Role;
import com.example.backend.model.Token;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    private final RoleService roleService;
    private final TokenService tokenService;

    private final UserMapper userMapper;


    public String login(UserLoginDTO userLoginDTO) {
        String username = userLoginDTO.getEmail();
        String password = userLoginDTO.getPassword();

        Optional<User> foundUser = userRepository.findByEmail(username);

        if(foundUser.isEmpty()){
            throw new DataNotFoundException("User not found");
        }

        User user = foundUser.get();

        if(Objects.equals(user.getStatus(), "blocked")){
            throw new RuntimeException("User is blocked");
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new WrongCredentialsException("Wrong password");
        }


        String token = jwtService.generateToken(user);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                username,
                password,
                user.getAuthorities());

        authenticationManager.authenticate(authenticationToken);
        return token;
    }

    public User register(UserRegisterDTO userRegisterDTO){
        Optional<User> user = userRepository.findByEmail(userRegisterDTO.getEmail());

        if(user.isPresent()){
            throw new EmailAlreadyExistsException("Email already in use");
        }

        Optional<Role> role = roleService.getRoleByName(userRegisterDTO.getRole());

        if(role.isEmpty()){
            throw new DataNotFoundException("Role not found");
        }

        User createdUser = User.builder()
                .name(userRegisterDTO.getName())
                .email(userRegisterDTO.getEmail())
                .password(passwordEncoder.encode(userRegisterDTO.getPassword()))
                .role(role.get())
                .status("active")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();


        return userRepository.save(createdUser);
    }

    public User getUserDetailsFromToken(String token) {
        String email = jwtService.getEmail(token);

        Optional<User> user = userRepository.findByEmail(email);

        if(user.isEmpty()){
            throw new DataNotFoundException("User not found");
        }

        return user.get();
    }

    public User getUserDetailsFromRefreshToken(String refreshToken) {
        Optional<Token> foundToken = tokenService.getTokenByRefreshToken(refreshToken);

        if(foundToken.isEmpty()){
            throw new DataNotFoundException("Refresh token not found");
        }

        Optional<User> user = userRepository.findByEmail(foundToken.get().getUser().getEmail());

        if(user.isEmpty()){
            throw new DataNotFoundException("User not found");
        }

        return user.get();
    }

    public String refreshToken(String token, RefreshTokenDTO refreshTokenDTO, User user){
        if(jwtService.validateToken(token)){
            throw new BadRequestException("Token still ok");
        }

        Optional<Token> foundToken = tokenService.getToken(token);

        if(foundToken.isEmpty() ){
            throw new DataNotFoundException("Token not found");
        }

        if(foundToken.get().isRevoked()){
            throw new BadRequestException("Token is revoked");
        }

        if(!Objects.equals(foundToken.get().getRefreshToken(), refreshTokenDTO.getRefreshToken())){
            throw new BadRequestException("Refresh token does not match");
        }

        if(Instant.now().isAfter(foundToken.get().getRefreshExpirationDate())){
            throw new BadRequestException("Refresh token expired");
        }

        String newToken = jwtService.generateToken(user);
        jwtService.revokeToken(token);

        return newToken;
    }

    public User updateUser(UUID id, UserUpdateDTO userUpdateDTO){
        Optional<User> foundUser = userRepository.findById(id);

        if(foundUser.isEmpty()){
            throw new DataNotFoundException("User not found");
        }

        User user = foundUser.get();
        String roleName = user.getRole().getRoleName();

        if(Objects.equals(roleName, "applicant")){
            userMapper.updateApplicant(userUpdateDTO, user);
        }else if(Objects.equals(roleName, "employer")){
            userMapper.updateEmployer(userUpdateDTO, user);
        }

        return user;
    }

    public User findById(UUID id){
        Optional<User> foundUser = userRepository.findById(id);

        if(foundUser.isEmpty()){
            throw new DataNotFoundException("User not found");
        }

        return foundUser.get();
    }
}
