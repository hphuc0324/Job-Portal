package com.example.backend.service;

import com.example.backend.dto.UserLoginDTO;
import com.example.backend.dto.UserRegisterDTO;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RoleService roleService;

    public String login(UserLoginDTO userLoginDTO) {
        String username = userLoginDTO.getEmail();
        String password = userLoginDTO.getPassword();

        Optional<User> foundUser = userRepository.findByEmail(username);

        if(foundUser.isEmpty()){
            throw new RuntimeException("Email not found");
        }

        User user = foundUser.get();

        if(Objects.equals(user.getStatus(), "blocked")){
            throw new RuntimeException("User is blocked");
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("Wrong password");
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
            throw new RuntimeException("Email already in use");
        }

        Optional<Role> role = roleService.getRoleByName(userRegisterDTO.getRole());

        if(role.isEmpty()){
            throw new RuntimeException("Role not found");
        }

        User createdUser = User.builder()
                .name(userRegisterDTO.getName())
                .email(userRegisterDTO.getEmail())
                .password(passwordEncoder.encode(userRegisterDTO.getPassword()))
                .role(role.get())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();


        return userRepository.save(createdUser);
    }

    public User getUserDetailsFromToken(String token) {
        String email = jwtService.getEmail(token);

        Optional<User> user = userRepository.findByEmail(email);

        return user.get();
    }


}
