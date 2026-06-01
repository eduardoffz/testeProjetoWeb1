# DevFreela

Plataforma freelancer focada em desenvolvedores, inspirada no GetNinjas. Conecta clientes a freelancers de tecnologia.

## Stack

- **Backend:** Java 17, Spring Boot 3.2 (Security, JPA, Validation), JWT (jjwt)
- **Frontend:** React 18, React Router 6, Axios
- **Database:** H2 (dev) / PostgreSQL (prod) — schema.sql + data.sql
- **Infra:** Docker, Docker Compose

## Arquitetura (Service/Repository/Controller)

```
backend/
  src/main/java/com/devfreela/
    config/          # SecurityConfig, DataInitializer
    controller/      # Auth, Project, Proposal, Review, User
    dto/             # Request/Response DTOs
    exception/       # GlobalExceptionHandler + custom exceptions
    model/           # User, Project, Proposal, Review + enums
    repository/      # JPA Repositories
    security/        # JwtTokenProvider, JwtAuthenticationFilter
    service/         # Auth, User, Project, Proposal, Review
```

## Banco de Dados

O banco é criado automaticamente com:

| Arquivo | Função |
|---------|--------|
| `schema.sql` | Cria as tabelas (users, projects, proposals, reviews) + índices |
| `data.sql` | Popula com dados de teste (usuários, projetos, avaliações) |

Compatível com **H2** (padrão) e **PostgreSQL** (profile `prod`).

Para usar PostgreSQL:
```bash
cd backend
mvn spring-boot:run -Dspring.profiles.active=prod
```

## Setup Rapido (script único)

```bash
chmod +x setup.sh
./setup.sh
```

O script:
1. Verifica Java, Node e Maven
2. Instala dependências do frontend
3. Compila o backend
4. Sobe o backend + banco H2 em http://localhost:8080
5. Sobe o frontend em http://localhost:3000

## Rodar manualmente

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend (outro terminal):**
```bash
cd frontend
npm install
npm start
```

## Docker

```bash
docker-compose up --build
```

## Rotas da API

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Cadastro (name, email, password, role, techSkills) |
| POST | `/api/auth/login` | Login retorna JWT |

### Projetos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/projects` | Listar (filtros: `?status=OPEN&search=api`) |
| GET | `/api/projects/{id}` | Detalhe |
| POST | `/api/projects` | Criar (auth: CLIENT) |
| PUT | `/api/projects/{id}` | Atualizar |
| DELETE | `/api/projects/{id}` | Deletar |
| POST | `/api/projects/{id}/assign/{fId}` | Atribuir freelancer |
| POST | `/api/projects/{id}/complete` | Concluir |

### Propostas
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/projects/{id}/proposals` | Enviar proposta |
| GET | `/api/projects/{id}/proposals` | Listar propostas do projeto |
| GET | `/api/proposals/mine` | Minhas propostas |
| POST | `/api/proposals/{id}/accept` | Aceitar proposta |
| POST | `/api/proposals/{id}/reject` | Rejeitar proposta |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/users` | Listar (`?role=FREELANCER`) |
| GET | `/api/users/{id}` | Perfil público |
| GET | `/api/users/me` | Meu perfil (auth) |
| PUT | `/api/users/me` | Editar perfil |

### Avaliações
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/projects/{id}/reviews/{userId}` | Avaliar usuário |
| GET | `/api/users/{id}/reviews` | Avaliações recebidas |
| GET | `/api/projects/{id}/reviews` | Avaliações do projeto |

## Credenciais de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Freelancer | ana@email.com | 123456 |
| Freelancer | carlos@email.com | 123456 |
| Cliente | contato@techcorp.com | 123456 |
| Cliente | hello@startupx.com | 123456 |
| Admin | admin@devfreela.com | 123456 |

## URLs

- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- H2 Console: http://localhost:8080/h2-console (JDBC: `jdbc:h2:mem:devfreela`, User: `sa`)
