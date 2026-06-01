package com.devfreela.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProposalRequestDTO {
    @NotBlank
    private String coverLetter;

    @NotNull
    private Double proposedValue;

    private Integer estimatedDays;
}
