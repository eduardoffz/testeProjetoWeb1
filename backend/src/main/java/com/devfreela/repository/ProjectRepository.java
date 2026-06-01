package com.devfreela.repository;

import com.devfreela.model.Project;
import com.devfreela.model.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatus(ProjectStatus status);
    List<Project> findByClientId(Long clientId);
    List<Project> findByFreelancerId(Long freelancerId);
    List<Project> findByTitleContainingIgnoreCase(String title);
}
