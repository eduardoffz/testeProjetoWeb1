package com.devfreela.service;

import com.devfreela.dto.UserResponseDTO;
import com.devfreela.exception.ResourceNotFoundException;
import com.devfreela.model.User;
import com.devfreela.repository.ReviewRepository;
import com.devfreela.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    public UserResponseDTO findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return toDTO(user);
    }

    public List<UserResponseDTO> findAll() {
        return userRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<UserResponseDTO> findByRole(String role) {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole().name().equalsIgnoreCase(role))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public UserResponseDTO updateProfile(Long id, String name, String bio, String techSkills,
                                          String githubUrl, String linkedinUrl) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (name != null) user.setName(name);
        if (bio != null) user.setBio(bio);
        if (techSkills != null) user.setTechSkills(techSkills);
        if (githubUrl != null) user.setGithubUrl(githubUrl);
        if (linkedinUrl != null) user.setLinkedinUrl(linkedinUrl);

        user = userRepository.save(user);
        return toDTO(user);
    }

    private UserResponseDTO toDTO(User user) {
        var reviews = reviewRepository.findByReviewedId(user.getId());
        double avgRating = reviews.isEmpty() ? 0.0 :
                reviews.stream().mapToInt(r -> r.getRating()).average().orElse(0.0);

        return UserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .bio(user.getBio())
                .profilePicture(user.getProfilePicture())
                .techSkills(user.getTechSkills())
                .githubUrl(user.getGithubUrl())
                .linkedinUrl(user.getLinkedinUrl())
                .role(user.getRole())
                .averageRating(Math.round(avgRating * 10.0) / 10.0)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
