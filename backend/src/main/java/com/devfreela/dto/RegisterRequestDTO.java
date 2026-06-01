package com.devfreela.dto;

import com.devfreela.model.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequestDTO {
    @NotBlank
    private String name;

    @Email @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotNull
    private UserRole role;

    private String techSkills;
    private String githubUrl;
    private String linkedinUrl;
}
