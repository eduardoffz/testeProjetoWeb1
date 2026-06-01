package com.devfreela.dto;

import com.devfreela.model.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ProjectResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String techRequirements;
    private BigDecimal budgetMin;
    private BigDecimal budgetMax;
    private Integer estimatedDays;
    private ProjectStatus status;
    private String clientName;
    private Long clientId;
    private String freelancerName;
    private Long freelancerId;
    private LocalDateTime createdAt;
}
