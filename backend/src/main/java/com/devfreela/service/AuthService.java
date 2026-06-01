package com.devfreela.service;

import com.devfreela.dto.AuthResponseDTO;
import com.devfreela.dto.LoginRequestDTO;
import com.devfreela.dto.RegisterRequestDTO;
import com.devfreela.exception.BusinessException;
import com.devfreela.model.User;
import com.devfreela.repository.UserRepository;
import com.devfreela.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .techSkills(request.getTechSkills())
                .githubUrl(request.getGithubUrl())
                .linkedinUrl(request.getLinkedinUrl())
                .build();

        user = userRepository.save(user);
        String token = tokenProvider.generateToken(user.getEmail(), user.getId(), user.getRole().name());

        return new AuthResponseDTO(token, user.getName(), user.getEmail(), user.getRole().name());
    }

    public AuthResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException("Invalid email or password");
        }

        String token = tokenProvider.generateToken(user.getEmail(), user.getId(), user.getRole().name());
        return new AuthResponseDTO(token, user.getName(), user.getEmail(), user.getRole().name());
    }
}
