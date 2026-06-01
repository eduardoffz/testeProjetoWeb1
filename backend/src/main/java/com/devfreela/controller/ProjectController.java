package com.devfreela.controller;

import com.devfreela.dto.ProjectRequestDTO;
import com.devfreela.dto.ProjectResponseDTO;
import com.devfreela.security.UserPrincipal;
import com.devfreela.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponseDTO> create(
            @Valid @RequestBody ProjectRequestDTO request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.create(request, principal.getUserId()));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> findAll(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        if (search != null) return ResponseEntity.ok(projectService.search(search));
        if (status != null) return ResponseEntity.ok(projectService.findByStatus(status));
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.findById(id));
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<ProjectResponseDTO>> findByClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(projectService.findByClient(clientId));
    }

    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<List<ProjectResponseDTO>> findByFreelancer(@PathVariable Long freelancerId) {
        return ResponseEntity.ok(projectService.findByFreelancer(freelancerId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequestDTO request) {
        return ResponseEntity.ok(projectService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/assign/{freelancerId}")
    public ResponseEntity<ProjectResponseDTO> assignFreelancer(
            @PathVariable Long id, @PathVariable Long freelancerId) {
        return ResponseEntity.ok(projectService.assignFreelancer(id, freelancerId));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<ProjectResponseDTO> complete(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.complete(id));
    }
}
