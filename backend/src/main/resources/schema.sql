-- DevFreela Database Schema
-- Compatível com PostgreSQL e H2

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    bio VARCHAR(500),
    profile_picture VARCHAR(255),
    tech_skills VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    role VARCHAR(20) NOT NULL CHECK (role IN ('FREELANCER', 'CLIENT', 'ADMIN')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    tech_requirements VARCHAR(255),
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    estimated_days INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    client_id BIGINT NOT NULL,
    freelancer_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_client FOREIGN KEY (client_id) REFERENCES users(id),
    CONSTRAINT fk_project_freelancer FOREIGN KEY (freelancer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS proposals (
    id BIGSERIAL PRIMARY KEY,
    cover_letter VARCHAR(2000) NOT NULL,
    proposed_value DOUBLE PRECISION,
    estimated_days INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    project_id BIGINT NOT NULL,
    freelancer_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_proposal_project FOREIGN KEY (project_id) REFERENCES projects(id),
    CONSTRAINT fk_proposal_freelancer FOREIGN KEY (freelancer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment VARCHAR(1000),
    project_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    reviewed_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_project FOREIGN KEY (project_id) REFERENCES projects(id),
    CONSTRAINT fk_review_reviewer FOREIGN KEY (reviewer_id) REFERENCES users(id),
    CONSTRAINT fk_review_reviewed FOREIGN KEY (reviewed_id) REFERENCES users(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_project_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_project_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_project_freelancer ON projects(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_proposal_project ON proposals(project_id);
CREATE INDEX IF NOT EXISTS idx_proposal_freelancer ON proposals(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_review_reviewed ON reviews(reviewed_id);
CREATE INDEX IF NOT EXISTS idx_review_project ON reviews(project_id);
