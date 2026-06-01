package com.devfreela.controller;

import com.devfreela.dto.ReviewRequestDTO;
import com.devfreela.dto.ReviewResponseDTO;
import com.devfreela.security.UserPrincipal;
import com.devfreela.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/projects/{projectId}/reviews/{reviewedId}")
    public ResponseEntity<ReviewResponseDTO> create(
            @PathVariable Long projectId,
            @PathVariable Long reviewedId,
            @Valid @RequestBody ReviewRequestDTO request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.create(request, projectId, principal.getUserId(), reviewedId));
    }

    @GetMapping("/users/{userId}/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> findByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.findByUser(userId));
    }

    @GetMapping("/projects/{projectId}/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> findByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(reviewService.findByProject(projectId));
    }
}
