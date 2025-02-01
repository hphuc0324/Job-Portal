package com.example.backend.service;

import com.example.backend.dto.UserExperienceDTO;

import com.example.backend.exception.DataNotFoundException;
import com.example.backend.model.Experience;
import com.example.backend.model.User;
import com.example.backend.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository experienceRepository;
    private final UserService userService;

    public void processExperience(List<UserExperienceDTO> experiences, UUID userID) {
        List<Experience> foundExperiences = experienceRepository.findAllByWorkerId(userID);

        User worker = userService.findById(userID);

        Set<UUID> incomingIds = experiences.stream()
                .filter(exp -> exp.getId() != null)
                .map(UserExperienceDTO::getId)
                .collect(Collectors.toSet());

        List<Experience> experiencesToDelete = foundExperiences.stream()
                .filter(exp -> !incomingIds.contains(exp.getId()))
                .toList();

        experienceRepository.deleteAll(experiencesToDelete);

        for (UserExperienceDTO experience : experiences) {
            if(experience.getId() == null) {
                Experience newExperience = new Experience();
                newExperience.setRole(experience.getRole());
                newExperience.setStartDate(experience.getStartDate());
                newExperience.setEndDate(experience.getEndDate());
                newExperience.setWorker(worker);
                newExperience.setCurrentlyWorking(experience.getIsCurrentlyWorking());

                User company = userService.findById(experience.getCompanyId());
                newExperience.setCompany(company);

                experienceRepository.save(newExperience);
            }else{
                Optional<Experience> foundOne = experienceRepository.findById(experience.getId());

                if(foundOne.isEmpty()){
                    throw new DataNotFoundException("Experience not found");
                }

                Experience updatedExperience = foundOne.get();
                updatedExperience.setRole(experience.getRole());
                updatedExperience.setStartDate(experience.getStartDate());
                updatedExperience.setEndDate(experience.getEndDate());
                updatedExperience.setWorker(worker);
                updatedExperience.setCurrentlyWorking(experience.getIsCurrentlyWorking());

                User company = userService.findById(experience.getCompanyId());
                updatedExperience.setCompany(company);
                experienceRepository.save(updatedExperience);
            }
        }
    }
}
