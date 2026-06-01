package com.devfreela.service;

import com.devfreela.dto.ProjectRequestDTO;
import com.devfreela.dto.ProjectResponseDTO;
import com.devfreela.exception.BusinessException;
import com.devfreela.exception.ResourceNotFoundException;
import com.devfreela.model.Project;
import com.devfreela.model.ProjectStatus;
import com.devfreela.model.User;
import com.devfreela.repository.ProjectRepository;
import com.devfreela.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectResponseDTO create(ProjectRequestDTO request, Long clientId) {
        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .techRequirements(request.getTechRequirements())
                .budgetMin(request.getBudgetMin())
                .budgetMax(request.getBudgetMax())
                .estimatedDays(request.getEstimatedDays())
                .status(ProjectStatus.OPEN)
                .client(client)
                .build();

        project = projectRepository.save(project);
        return toDTO(project);
    }

    public ProjectResponseDTO findById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        return toDTO(project);
    }

    public List<ProjectResponseDTO> findAll() {
        return projectRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectResponseDTO> findByStatus(String status) {
        return projectRepository.findByStatus(ProjectStatus.valueOf(status.toUpperCase()))
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProjectResponseDTO> findByClient(Long clientId) {
        return projectRepository.findByClientId(clientId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProjectResponseDTO> findByFreelancer(Long freelancerId) {
        return projectRepository.findByFreelancerId(freelancerId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProjectResponseDTO> search(String title) {
        return projectRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public ProjectResponseDTO update(Long id, ProjectRequestDTO request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setTechRequirements(request.getTechRequirements());
        project.setBudgetMin(request.getBudgetMin());
        project.setBudgetMax(request.getBudgetMax());
        project.setEstimatedDays(request.getEstimatedDays());

        project = projectRepository.save(project);
        return toDTO(project);
    }

    public void delete(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found");
        }
        projectRepository.deleteById(id);
    }

    public ProjectResponseDTO assignFreelancer(Long projectId, Long freelancerId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        if (project.getStatus() != ProjectStatus.OPEN) {
            throw new BusinessException("Project is not open for proposals");
        }

        User freelancer = userRepository.findById(freelancerId)
                .orElseThrow(() -> new ResourceNotFoundException("Freelancer not found"));

        project.setFreelancer(freelancer);
        project.setStatus(ProjectStatus.IN_PROGRESS);
        project = projectRepository.save(project);
        return toDTO(project);
    }

    public ProjectResponseDTO complete(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        project.setStatus(ProjectStatus.COMPLETED);
        project = projectRepository.save(project);
        return toDTO(project);
    }

    private ProjectResponseDTO toDTO(Project project) {
        return ProjectResponseDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .techRequirements(project.getTechRequirements())
                .budgetMin(project.getBudgetMin())
                .budgetMax(project.getBudgetMax())
                .estimatedDays(project.getEstimatedDays())
                .status(project.getStatus())
                .clientName(project.getClient().getName())
                .clientId(project.getClient().getId())
                .freelancerName(project.getFreelancer() != null ? project.getFreelancer().getName() : null)
                .freelancerId(project.getFreelancer() != null ? project.getFreelancer().getId() : null)
                .createdAt(project.getCreatedAt())
                .build();
    }
}
