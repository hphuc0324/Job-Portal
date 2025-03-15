package com.example.backend.mapper;

import com.example.backend.dto.JobDTO;
import com.example.backend.model.Job;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = UserMapper.class, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface JobMapper {
    @Named("toJobDTO")
    @Mapping(source = "company", target = "company", qualifiedByName = "toUserDTO")
    @Mapping(source = "level.name", target = "level")
    @Mapping(source = "category.name", target = "category")
    JobDTO toJobDTO(Job job);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "company", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "level", ignore = true)
    @Mapping(target = "category", ignore = true)
    void updateJob(JobDTO from, @MappingTarget Job to);
}
