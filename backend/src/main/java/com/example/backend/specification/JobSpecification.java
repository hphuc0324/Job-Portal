package com.example.backend.specification;

import com.example.backend.dto.JobFilterDTO;
import com.example.backend.model.Job;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class JobSpecification {
    public static Specification<Job> withFilters(JobFilterDTO filter) {
        return (Root<Job> root,CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(filter.getTitle() != null){
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + filter.getTitle().toLowerCase() + "%"));
            }

            if(filter.getLocation() != null){
                predicates.add(cb.like(cb.lower(root.get("location")), "%" +filter.getLocation().toLowerCase() + "%"));
            }

            if(filter.getLevel() != null){
                predicates.add(cb.equal(root.get("level").get("slug"), filter.getLevel()));
            }

            if(filter.getMinPrice() != null){
                predicates.add(cb.greaterThanOrEqualTo(root.get("salary"), filter.getMinPrice()));
            }

            if(filter.getMaxPrice() != null){
                predicates.add(cb.lessThanOrEqualTo(root.get("salary"), filter.getMaxPrice()));
            }

            if(filter.getCategories() != null){
                CriteriaBuilder.In<String> inClause = cb.in(root.get("category").get("slug"));
                for(String category : filter.getCategories()){
                    inClause.value(category);
                }

                predicates.add(inClause);
            }

            if(filter.getType() != null){
                CriteriaBuilder.In<String> inClause = cb.in(root.get("type"));
                for(String type : filter.getType()){
                    inClause.value(type);
                }

                predicates.add(inClause);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
