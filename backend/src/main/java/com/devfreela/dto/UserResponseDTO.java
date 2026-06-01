package com.devfreela.dto;

import com.devfreela.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String bio;
    private String profilePicture;
    private String techSkills;
    private String githubUrl;
    private String linkedinUrl;
    private UserRole role;
    private Double averageRating;
    private LocalDateTime createdAt;
}
