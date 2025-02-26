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
                predicates.add(cb.like(root.get("location"), "%" + filter.getLocation() + "%"));
            }

            if(filter.getRoleName() != null) {
                predicates.add(cb.like(root.get("role").get("roleName"), "%" + filter.getRoleName() + "%"));
            }

            predicates.add(cb.greaterThanOrEqualTo(root.get("experience"), filter.getExperience()));


            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
