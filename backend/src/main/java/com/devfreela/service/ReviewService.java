package com.devfreela.service;

import com.devfreela.dto.ReviewRequestDTO;
import com.devfreela.dto.ReviewResponseDTO;
import com.devfreela.exception.BusinessException;
import com.devfreela.exception.ResourceNotFoundException;
import com.devfreela.model.Project;
import com.devfreela.model.ProjectStatus;
import com.devfreela.model.Review;
import com.devfreela.model.User;
import com.devfreela.repository.ProjectRepository;
import com.devfreela.repository.ReviewRepository;
import com.devfreela.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ReviewResponseDTO create(ReviewRequestDTO request, Long projectId, Long reviewerId, Long reviewedId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        if (project.getStatus() != ProjectStatus.COMPLETED) {
            throw new BusinessException("Can only review completed projects");
        }

        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found"));
        User reviewed = userRepository.findById(reviewedId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewed user not found"));

        Review review = Review.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .project(project)
                .reviewer(reviewer)
                .reviewed(reviewed)
                .build();

        review = reviewRepository.save(review);
        return toDTO(review);
    }

    public List<ReviewResponseDTO> findByUser(Long userId) {
        return reviewRepository.findByReviewedId(userId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<ReviewResponseDTO> findByProject(Long projectId) {
        return reviewRepository.findByProjectId(projectId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    private ReviewResponseDTO toDTO(Review review) {
        return ReviewResponseDTO.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .projectId(review.getProject().getId())
                .projectTitle(review.getProject().getTitle())
                .reviewerId(review.getReviewer().getId())
                .reviewerName(review.getReviewer().getName())
                .reviewedId(review.getReviewed().getId())
                .reviewedName(review.getReviewed().getName())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
