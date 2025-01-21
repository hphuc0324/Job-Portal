package com.example.backend.service;

import com.example.backend.model.Role;
import com.example.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Optional<Role> getRoleByName(String name) {
        return roleRepository.findByRoleName(name);
    }
}
