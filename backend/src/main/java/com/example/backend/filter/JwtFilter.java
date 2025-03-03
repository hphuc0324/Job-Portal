package com.example.backend.filter;

import com.example.backend.exception.BadRequestException;
import com.example.backend.exception.UnauthorizedAccessException;
import com.example.backend.model.User;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.JwtService;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;

    @Value("${api.prefix}")
    private String apiPrefix;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (isBypassToken(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new UnauthorizedAccessException("Invalid JWT token");
            }
            String token = authHeader.split("Bearer ")[1];

            if (!jwtService.validateToken(token)) {
                throw new BadRequestException("Invalid JWT token");
            }

            String email = jwtService.getEmail(token);
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = (User) userDetailsService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);


                filterChain.doFilter(request, response);
            }
        } catch (Exception e) {

            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(objectMapper.writeValueAsString(
                    ResponseObject.builder()
                            .message(e.getMessage())
                            .status(HttpStatus.UNAUTHORIZED)
                            .build()
            ));
        }

    }

    private boolean isBypassToken(HttpServletRequest request) {

        List<Pair<String, String>> bypass = List.of(
                Pair.of(String.format("%s/healthcheck", apiPrefix), "GET"),
                Pair.of(String.format("%s/auth/login", apiPrefix), "POST"),
                Pair.of(String.format("%s/auth/register", apiPrefix), "POST"),
                Pair.of(String.format("%s/auth/refresh-token", apiPrefix), "POST"),
                Pair.of(String.format("%s/auth/social-login", apiPrefix), "GET"),
                Pair.of(String.format("%s/auth/social/callback", apiPrefix), "GET"),
                Pair.of(String.format("%s/user/getAll", apiPrefix), "GET"),
                Pair.of(String.format("%s/user/profile", apiPrefix), "GET"),
                Pair.of(String.format("%s/job", apiPrefix), "GET")
        );

        for (Pair<String, String> pair : bypass) {
            if (request.getServletPath().contains(pair.getFirst()) && request.getMethod().equals(pair.getSecond())) {
                return true;
            }
        }

        return false;
    }
}
