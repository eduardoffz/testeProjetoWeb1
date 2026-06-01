-- DevFreela Seed Data
-- Senhas: 123456 (bcrypt)
-- INSERT ONLY IF TABLE IS EMPTY

-- Users
INSERT INTO users (email, password, name, bio, tech_skills, github_url, linkedin_url, role, created_at, updated_at)
SELECT * FROM (
    SELECT 'admin@devfreela.com' AS email,
           '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' AS password,
           'Admin DevFreela' AS name,
           'Platform administrator and full-stack developer' AS bio,
           'Java, Spring, React, Angular, Docker, AWS' AS tech_skills,
           NULL AS github_url, NULL AS linkedin_url, 'ADMIN' AS role,
           CURRENT_TIMESTAMP AS created_at, CURRENT_TIMESTAMP AS updated_at
) WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@devfreela.com');

INSERT INTO users (email, password, name, bio, tech_skills, github_url, linkedin_url, role, created_at, updated_at)
SELECT * FROM (
    SELECT 'ana@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
           'Ana Silva', 'Full-stack developer with 5+ years of experience',
           'React, Node.js, TypeScript, PostgreSQL, Docker',
           'https://github.com/anasilva', 'https://linkedin.com/in/anasilva', 'FREELANCER',
           CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'ana@email.com');

INSERT INTO users (email, password, name, bio, tech_skills, github_url, linkedin_url, role, created_at, updated_at)
SELECT * FROM (
    SELECT 'carlos@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
           'Carlos Oliveira', 'Mobile developer specializing in React Native and Flutter',
           'React Native, Flutter, Kotlin, Swift',
           'https://github.com/carlosoliveira', NULL, 'FREELANCER',
           CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'carlos@email.com');

INSERT INTO users (email, password, name, bio, tech_skills, github_url, linkedin_url, role, created_at, updated_at)
SELECT * FROM (
    SELECT 'contato@techcorp.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
           'TechCorp Ltda', 'Technology company looking for top talent',
           NULL, NULL, NULL, 'CLIENT',
           CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'contato@techcorp.com');

INSERT INTO users (email, password, name, bio, tech_skills, github_url, linkedin_url, role, created_at, updated_at)
SELECT * FROM (
    SELECT 'hello@startupx.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
           'StartupX', 'Early-stage startup building the future',
           NULL, NULL, NULL, 'CLIENT',
           CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'hello@startupx.com');

-- Projects
INSERT INTO projects (title, description, tech_requirements, budget_min, budget_max, estimated_days, status, client_id, created_at, updated_at)
SELECT 'E-commerce API Development',
       'We need a RESTful API for an e-commerce platform with product management, cart, checkout, and payment integration.',
       'Java, Spring Boot, PostgreSQL, Redis', 8000, 15000, 45, 'OPEN',
       (SELECT id FROM users WHERE email = 'contato@techcorp.com'),
       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'E-commerce API Development');

INSERT INTO projects (title, description, tech_requirements, budget_min, budget_max, estimated_days, status, client_id, created_at, updated_at)
SELECT 'React Dashboard Frontend',
       'Build a modern admin dashboard with charts, tables, and responsive design using React.',
       'React, TypeScript, Tailwind CSS, Chart.js', 5000, 10000, 30, 'OPEN',
       (SELECT id FROM users WHERE email = 'contato@techcorp.com'),
       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'React Dashboard Frontend');

INSERT INTO projects (title, description, tech_requirements, budget_min, budget_max, estimated_days, status, client_id, created_at, updated_at)
SELECT 'Mobile App MVP',
       'Create a cross-platform mobile app for task management with real-time sync.',
       'React Native, Firebase, WebSockets', 12000, 20000, 60, 'OPEN',
       (SELECT id FROM users WHERE email = 'hello@startupx.com'),
       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Mobile App MVP');

-- Reviews
INSERT INTO reviews (rating, comment, project_id, reviewer_id, reviewed_id, created_at)
SELECT 5, 'Excellent work, delivered on time!',
       (SELECT id FROM projects WHERE title = 'E-commerce API Development'),
       (SELECT id FROM users WHERE email = 'contato@techcorp.com'),
       (SELECT id FROM users WHERE email = 'ana@email.com'),
       CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE comment = 'Excellent work, delivered on time!');

INSERT INTO reviews (rating, comment, project_id, reviewer_id, reviewed_id, created_at)
SELECT 4, 'Great quality code, very communicative.',
       (SELECT id FROM projects WHERE title = 'React Dashboard Frontend'),
       (SELECT id FROM users WHERE email = 'hello@startupx.com'),
       (SELECT id FROM users WHERE email = 'ana@email.com'),
       CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE comment = 'Great quality code, very communicative.');
