package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "jobs")
public class Job {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "year_experience")
    private Integer yearExperience;

    @Column(name = "salary")
    private Integer salary;

    @Column(name = "location")
    private String location;

    @Column(name = "description")
    private String description;

    @Column(name = "requirement")
    private String requirement;

    @Column(name = "benefit")
    private String benefit;

    @Column(name = "responsibility")
    private String responsibility;

    @Column(name = "slug")
    private String slug;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private String status;

    @Column(name = "number_of_applicants")
    private Integer numberOfApplicants;

    @ManyToOne
    @JoinColumn(name = "level_id", referencedColumnName = "id")
    private Level level;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private User company;
}
