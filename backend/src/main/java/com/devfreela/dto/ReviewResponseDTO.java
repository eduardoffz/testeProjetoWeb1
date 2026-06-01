package com.devfreela.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ReviewResponseDTO {
    private Long id;
    private Integer rating;
    private String comment;
    private Long projectId;
    private String projectTitle;
    private Long reviewerId;
    private String reviewerName;
    private Long reviewedId;
    private String reviewedName;
    private LocalDateTime createdAt;
}
