package com.example.backend.aspect;

import com.example.backend.annotation.IsJobOwner;
import com.example.backend.annotation.IsProfileOwner;

import com.example.backend.exception.ForbiddenException;
import com.example.backend.model.Job;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Aspect
@RequiredArgsConstructor
public class OwnershipAspect {
    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Before("@annotation(isProfileOwner)")
    public void checkProfileOwner(JoinPoint joinPoint, IsProfileOwner isProfileOwner) throws Throwable {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(authenticatedUsername);
        Optional<User> authenticatedUser = userRepository.findByEmail(authenticatedUsername);

        if(authenticatedUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();

        String idParamName = isProfileOwner.idParam();
        Object[] args = joinPoint.getArgs();
        String[] paramNames = methodSignature.getParameterNames();

        for(int i = 0; i < paramNames.length; i++) {
            if(paramNames[i].equals(idParamName)) {
                if(!authenticatedUser.get().getId().equals(args[i])) {
                    throw new RuntimeException("User not owned");
                }
                return;
            }
        }
    }

    @Before("@annotation(isJobOwner)")
    public void checkJobOwner(JoinPoint joinPoint, IsJobOwner isJobOwner) throws Throwable {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> authenticatedUser = userRepository.findByEmail(authenticatedUsername);

        if(authenticatedUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();

        String idParamName = isJobOwner.idParam();
        Object[] args = joinPoint.getArgs();
        String[] paramNames = methodSignature.getParameterNames();

        for(int i = 0; i < paramNames.length; i++) {
            if(paramNames[i].equals(idParamName)) {
                Job job = entityManager.createQuery("SELECT j FROM Job j WHERE j.slug = :slug",
                        Job.class
                        ).setParameter("slug", args[i]).getSingleResult();
                if(!job.getCompany().getId().equals(authenticatedUser.get().getId())) {
                    throw new ForbiddenException("User not owned");
                }
                return;
            }
        }
    }
}
