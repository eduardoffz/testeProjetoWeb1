package com.devfreela.controller;

import com.devfreela.dto.ProposalRequestDTO;
import com.devfreela.dto.ProposalResponseDTO;
import com.devfreela.security.UserPrincipal;
import com.devfreela.service.ProposalService;
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
public class ProposalController {

    private final ProposalService proposalService;

    @PostMapping("/projects/{projectId}/proposals")
    public ResponseEntity<ProposalResponseDTO> create(
            @PathVariable Long projectId,
            @Valid @RequestBody ProposalRequestDTO request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(proposalService.create(request, projectId, principal.getUserId()));
    }

    @GetMapping("/projects/{projectId}/proposals")
    public ResponseEntity<List<ProposalResponseDTO>> findByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(proposalService.findByProject(projectId));
    }

    @GetMapping("/proposals/mine")
    public ResponseEntity<List<ProposalResponseDTO>> myProposals(
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(proposalService.findByFreelancer(principal.getUserId()));
    }

    @PostMapping("/proposals/{id}/accept")
    public ResponseEntity<Void> accept(@PathVariable Long id) {
        proposalService.acceptProposal(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/proposals/{id}/reject")
    public ResponseEntity<Void> reject(@PathVariable Long id) {
        proposalService.rejectProposal(id);
        return ResponseEntity.noContent().build();
    }
}
