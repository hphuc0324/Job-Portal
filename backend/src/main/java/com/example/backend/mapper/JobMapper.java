package com.example.backend.mapper;

import com.example.backend.dto.JobDTO;
import com.example.backend.model.Job;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;

@Mapper(componentModel = "spring", uses = UserMapper.class, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface JobMapper {
    @Mapping(source = "company", target = "company", qualifiedByName = "toUserDTO")
    @Mapping(source = "level.name", target = "level")
    @Mapping(source = "category.name", target = "category")
    JobDTO toJobDTO(Job job);
}
