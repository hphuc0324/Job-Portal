package com.example.backend.mapper;

import com.example.backend.dto.ApplicationDTO;
import com.example.backend.model.Application;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {UserMapper.class, JobMapper.class}, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ApplicationMapper {

    @Mapping(source = "job", target = "job", qualifiedByName = "toJobDTO")
    @Mapping(source = "user", target = "user", qualifiedByName = "toUserDTO")
    ApplicationDTO toApplicationDTO(Application application);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "job", ignore = true)
    void updateApplication(ApplicationDTO from,@MappingTarget Application to);
}
