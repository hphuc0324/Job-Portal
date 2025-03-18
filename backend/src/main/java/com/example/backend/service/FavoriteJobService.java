package com.example.backend.service;

import com.example.backend.model.FavoriteJob;
import com.example.backend.model.Job;
import com.example.backend.repository.FavoriteJobRepository;
import com.example.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteJobService {
    private final JobService jobService;
    private final UserService userService;
    private final FavoriteJobRepository favoriteJobRepository;

    public List<Job> getFavoriteJobs(UUID user) {
        List<FavoriteJob> favorites =  favoriteJobRepository.findAllByUserId(user);

        return favorites.stream()
                .map((favor -> jobService.findById(favor.getJob().getId())))
                .toList();
    }

    public FavoriteJob addToFavorite(UUID userId, UUID jobId) {
        FavoriteJob favoriteJob = new FavoriteJob();

        favoriteJob.setJob(jobService.findById(jobId));
        favoriteJob.setUser(userService.findById(userId));

        return favoriteJobRepository.save(favoriteJob);
    }

    public void removeFromFavorite(UUID userId, UUID jobId) {
        FavoriteJob favoriteJob = favoriteJobRepository.findByUserIdAndJobId(userId, jobId);

        if(favoriteJob != null) {
            favoriteJobRepository.delete(favoriteJob);
        }
    }
}
