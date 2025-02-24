package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.dto.UserDetailsDTO;
import com.example.backend.dto.UserUpdateDTO;
import com.example.backend.model.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface UserMapper {
    @BeanMapping(nullValuePropertyMappingStrategy  = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    void updateApplicant(UserUpdateDTO from, @MappingTarget User to);

    @BeanMapping(nullValuePropertyMappingStrategy  = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "job", ignore = true)
    @Mapping(target = "skills", ignore = true)
    @Mapping(target = "experience", ignore = true)
    void updateEmployer(UserUpdateDTO from, @MappingTarget User to);

    @Mapping(source = "role.roleName", target = "role")
    UserDTO toUserDTO(User user);

    UserDetailsDTO toUserDetailsDTO(User user);
}
