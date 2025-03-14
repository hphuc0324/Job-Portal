package com.example.backend.specification;

import com.example.backend.dto.UserFilterDTO;
import com.example.backend.model.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class UserSpecification {
    public static Specification<User> withFilters(UserFilterDTO filter) {
        return (Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getName() != null) {
                predicates.add(cb.like(root.get("name"), "%" + filter.getName() + "%"));
            }

            if (filter.getLocation() != null) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + filter.getLocation().toLowerCase() + "%"));
            }

            if(filter.getRoleName() != null) {
                predicates.add(cb.like(root.get("role").get("roleName"), "%" + filter.getRoleName() + "%"));
            }

            if(filter.getMinExperience() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("experience"), filter.getMinExperience()));
            }

            if(filter.getMaxExperience() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("experience"), filter.getMaxExperience()));
            }

            if(filter.getSkills() != null) {
                List<Predicate> skillPredicates = new ArrayList<>();
                for(String skill : filter.getSkills()){
                    skillPredicates.add(cb.like(cb.lower(root.get("skills")), "%" + skill.toLowerCase() + "%"));
                }

                predicates.add(cb.or(skillPredicates.toArray(new Predicate[0])));
            }

            predicates.add(cb.greaterThanOrEqualTo(root.get("experience"), filter.getExperience()));


            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
