package com.devfreela.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ProposalResponseDTO {
    private Long id;
    private String coverLetter;
    private Double proposedValue;
    private Integer estimatedDays;
    private String status;
    private Long projectId;
    private String projectTitle;
    private Long freelancerId;
    private String freelancerName;
    private LocalDateTime createdAt;
}
