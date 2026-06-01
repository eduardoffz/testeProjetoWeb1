package com.devfreela.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProjectRequestDTO {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String techRequirements;

    private BigDecimal budgetMin;
    private BigDecimal budgetMax;
    private Integer estimatedDays;
}
