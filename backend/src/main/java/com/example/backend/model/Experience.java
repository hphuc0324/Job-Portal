package com.example.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "experiences")
public class Experience {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "role")
    private String role;

    @Column(name = "location")
    private String location;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "is_currently_working")
    private boolean isCurrentlyWorking;

    @ManyToOne
    @JoinColumn(name = "worker_id", referencedColumnName = "id")
    private User worker;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private User company;

}
