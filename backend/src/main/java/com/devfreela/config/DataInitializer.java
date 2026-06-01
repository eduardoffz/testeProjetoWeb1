package com.devfreela.config;

import com.devfreela.model.*;
import com.devfreela.repository.ProjectRepository;
import com.devfreela.repository.ReviewRepository;
import com.devfreela.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        User admin = User.builder()
                .name("Admin DevFreela")
                .email("admin@devfreela.com")
                .password(passwordEncoder.encode("123456"))
                .bio("Platform administrator and full-stack developer")
                .techSkills("Java, Spring, React, Angular, Docker, AWS")
                .role(UserRole.ADMIN)
                .build();

        User freelancer1 = User.builder()
                .name("Ana Silva")
                .email("ana@email.com")
                .password(passwordEncoder.encode("123456"))
                .bio("Full-stack developer with 5+ years of experience")
                .techSkills("React, Node.js, TypeScript, PostgreSQL, Docker")
                .githubUrl("https://github.com/anasilva")
                .linkedinUrl("https://linkedin.com/in/anasilva")
                .role(UserRole.FREELANCER)
                .build();

        User freelancer2 = User.builder()
                .name("Carlos Oliveira")
                .email("carlos@email.com")
                .password(passwordEncoder.encode("123456"))
                .bio("Mobile developer specializing in React Native and Flutter")
                .techSkills("React Native, Flutter, Kotlin, Swift")
                .githubUrl("https://github.com/carlosoliveira")
                .role(UserRole.FREELANCER)
                .build();

        User client1 = User.builder()
                .name("TechCorp Ltda")
                .email("contato@techcorp.com")
                .password(passwordEncoder.encode("123456"))
                .bio("Technology company looking for top talent")
                .role(UserRole.CLIENT)
                .build();

        User client2 = User.builder()
                .name("StartupX")
                .email("hello@startupx.com")
                .password(passwordEncoder.encode("123456"))
                .bio("Early-stage startup building the future")
                .role(UserRole.CLIENT)
                .build();

        userRepository.saveAll(List.of(admin, freelancer1, freelancer2, client1, client2));

        Project p1 = Project.builder()
                .title("E-commerce API Development")
                .description("We need a RESTful API for an e-commerce platform with product management, cart, checkout, and payment integration.")
                .techRequirements("Java, Spring Boot, PostgreSQL, Redis")
                .budgetMin(new BigDecimal("8000"))
                .budgetMax(new BigDecimal("15000"))
                .estimatedDays(45)
                .status(ProjectStatus.OPEN)
                .client(client1)
                .build();

        Project p2 = Project.builder()
                .title("React Dashboard Frontend")
                .description("Build a modern admin dashboard with charts, tables, and responsive design using React.")
                .techRequirements("React, TypeScript, Tailwind CSS, Chart.js")
                .budgetMin(new BigDecimal("5000"))
                .budgetMax(new BigDecimal("10000"))
                .estimatedDays(30)
                .status(ProjectStatus.OPEN)
                .client(client1)
                .build();

        Project p3 = Project.builder()
                .title("Mobile App MVP")
                .description("Create a cross-platform mobile app for task management with real-time sync.")
                .techRequirements("React Native, Firebase, WebSockets")
                .budgetMin(new BigDecimal("12000"))
                .budgetMax(new BigDecimal("20000"))
                .estimatedDays(60)
                .status(ProjectStatus.OPEN)
                .client(client2)
                .build();

        projectRepository.saveAll(List.of(p1, p2, p3));

        Review r1 = Review.builder()
                .rating(5)
                .comment("Excellent work, delivered on time!")
                .project(p1)
                .reviewer(client1)
                .reviewed(freelancer1)
                .build();

        Review r2 = Review.builder()
                .rating(4)
                .comment("Great quality code, very communicative.")
                .project(p2)
                .reviewer(client2)
                .reviewed(freelancer1)
                .build();

        reviewRepository.saveAll(List.of(r1, r2));
    }
}
