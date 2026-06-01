package com.devfreela.service;

import com.devfreela.dto.ProposalRequestDTO;
import com.devfreela.dto.ProposalResponseDTO;
import com.devfreela.exception.BusinessException;
import com.devfreela.exception.ResourceNotFoundException;
import com.devfreela.model.Project;
import com.devfreela.model.ProjectStatus;
import com.devfreela.model.Proposal;
import com.devfreela.model.User;
import com.devfreela.repository.ProjectRepository;
import com.devfreela.repository.ProposalRepository;
import com.devfreela.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProposalService {

    private final ProposalRepository proposalRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProposalResponseDTO create(ProposalRequestDTO request, Long projectId, Long freelancerId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        if (project.getStatus() != ProjectStatus.OPEN) {
            throw new BusinessException("Project is no longer accepting proposals");
        }

        User freelancer = userRepository.findById(freelancerId)
                .orElseThrow(() -> new ResourceNotFoundException("Freelancer not found"));

        Proposal proposal = Proposal.builder()
                .coverLetter(request.getCoverLetter())
                .proposedValue(request.getProposedValue())
                .estimatedDays(request.getEstimatedDays())
                .status("PENDING")
                .project(project)
                .freelancer(freelancer)
                .build();

        proposal = proposalRepository.save(proposal);
        return toDTO(proposal);
    }

    public List<ProposalResponseDTO> findByProject(Long projectId) {
        return proposalRepository.findByProjectId(projectId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProposalResponseDTO> findByFreelancer(Long freelancerId) {
        return proposalRepository.findByFreelancerId(freelancerId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public void acceptProposal(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found"));

        proposal.setStatus("ACCEPTED");
        proposalRepository.save(proposal);

        Project project = proposal.getProject();
        project.setFreelancer(proposal.getFreelancer());
        project.setStatus(ProjectStatus.IN_PROGRESS);
        projectRepository.save(project);
    }

    public void rejectProposal(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found"));
        proposal.setStatus("REJECTED");
        proposalRepository.save(proposal);
    }

    private ProposalResponseDTO toDTO(Proposal proposal) {
        return ProposalResponseDTO.builder()
                .id(proposal.getId())
                .coverLetter(proposal.getCoverLetter())
                .proposedValue(proposal.getProposedValue())
                .estimatedDays(proposal.getEstimatedDays())
                .status(proposal.getStatus())
                .projectId(proposal.getProject().getId())
                .projectTitle(proposal.getProject().getTitle())
                .freelancerId(proposal.getFreelancer().getId())
                .freelancerName(proposal.getFreelancer().getName())
                .createdAt(proposal.getCreatedAt())
                .build();
    }
}
