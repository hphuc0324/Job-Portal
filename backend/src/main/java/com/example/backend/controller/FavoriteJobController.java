package com.example.backend.controller;

import com.example.backend.annotation.IsProfileOwner;
import com.example.backend.dto.FavoriteJobDTO;
import com.example.backend.model.FavoriteJob;
import com.example.backend.model.Job;
import com.example.backend.response.ResponseObject;
import com.example.backend.service.FavoriteJobService;
import com.example.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/favorite")
@RequiredArgsConstructor
public class FavoriteJobController {
    private final FavoriteJobService favoriteJobService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getFavoriteJobs(
            @PathVariable(name = "id") UUID id
            ) {
        List<Job> jobs = favoriteJobService.getFavoriteJobs(id);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get favorite list successfully")
                        .data(jobs)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @DeleteMapping("/{userId}/{jobId}")
    public ResponseEntity<ResponseObject> removeFavoriteJob(
            @PathVariable(name = "userId") UUID userId,
            @PathVariable(name = "jobId") UUID jobId
            ){
        favoriteJobService.removeFromFavorite(userId, jobId);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Remove favorite job successfully")
                        .data("")
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PostMapping()
    public ResponseEntity<ResponseObject> addFavoriteJob(
            @RequestBody FavoriteJobDTO favoriteJob){

        FavoriteJob createdFavoriteJob = favoriteJobService.addToFavorite(favoriteJob.getUserId(), favoriteJob.getJobId());

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Add favorite job successfully")
                        .data(createdFavoriteJob)
                        .status(HttpStatus.CREATED)
                        .build()
        );
    }

}
