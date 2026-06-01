package com.devfreela.controller;

import com.devfreela.dto.UserResponseDTO;
import com.devfreela.security.UserPrincipal;
import com.devfreela.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> findAll(
            @RequestParam(required = false) String role) {
        if (role != null) {
            return ResponseEntity.ok(userService.findByRole(role));
        }
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> me(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userService.findById(principal.getUserId()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDTO> updateProfile(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(userService.updateProfile(
                principal.getUserId(),
                body.get("name"),
                body.get("bio"),
                body.get("techSkills"),
                body.get("githubUrl"),
                body.get("linkedinUrl")
        ));
    }
}
