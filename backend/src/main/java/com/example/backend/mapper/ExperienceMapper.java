package com.example.backend.mapper;

import com.example.backend.dto.ExperienceDTO;
import com.example.backend.model.Experience;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;

@Mapper(componentModel = "spring", uses = UserMapper.class, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ExperienceMapper {
    @Mapping(ignore = true, target = "company")
    ExperienceDTO toDTO(Experience experience);
}
