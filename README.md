# DevFreela

Plataforma freelancer focada em desenvolvedores, inspirada no GetNinjas. Conecta clientes a freelancers de tecnologia.

## Stack

- **Backend:** Java 17, Spring Boot 3.2 (Security, JPA, Validation), JWT (jjwt), H2 (dev) / PostgreSQL (prod)
- **Frontend:** React 18, React Router 6, Axios
- **Infra:** Docker, Docker Compose

## Arquitetura (Service/Repository/Controller)

```
backend/
  src/main/java/com/devfreela/
    config/          # SecurityConfig, DataInitializer
    controller/      # AuthController, ProjectController, ProposalController, ReviewController, UserController
    dto/             # Request/Response DTOs
    exception/       # GlobalExceptionHandler, ResourceNotFoundException, BusinessException
    model/           # User, Project, Proposal, Review + enums
    repository/      # JPA Repositories
    security/        # JwtTokenProvider, JwtAuthenticationFilter, UserPrincipal
    service/         # AuthService, ProjectService, ProposalService, ReviewService, UserService
    DevFreelaApplication.java
```

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/register | Cadastro |
| POST | /api/auth/login | Login |
| GET | /api/projects | Listar projetos (filtros: status, search) |
| GET | /api/projects/{id} | Detalhe do projeto |
| POST | /api/projects | Criar projeto (auth) |
| PUT | /api/projects/{id} | Atualizar projeto (auth) |
| DELETE | /api/projects/{id} | Deletar projeto (auth) |
| POST | /api/projects/{id}/assign/{fId} | Atribuir freelancer |
| POST | /api/projects/{id}/complete | Concluir projeto |
| POST | /api/projects/{id}/proposals | Enviar proposta |
| GET | /api/projects/{id}/proposals | Listar propostas |
| GET | /api/users | Listar usuários |
| GET | /api/users/{id} | Perfil do usuário |
| GET | /api/users/me | Meu perfil (auth) |
| PUT | /api/users/me | Editar perfil (auth) |
| POST | /api/projects/{id}/reviews/{userId} | Avaliar usuário |
| GET | /api/users/{id}/reviews | Avaliações do usuário |

## Como Rodar

### Local (sem Docker)

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

### Docker
```bash
docker-compose up --build
```

### Script de inicialização
```bash
chmod +x start.sh
./start.sh          # Inicia ambos
./start.sh backend  # Só backend
./start.sh frontend # Só frontend
```

## Credenciais de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Freelancer | ana@email.com | 123456 |
| Freelancer | carlos@email.com | 123456 |
| Cliente | contato@techcorp.com | 123456 |
| Cliente | hello@startupx.com | 123456 |
| Admin | admin@devfreela.com | 123456 |

- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- H2 Console: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:devfreela`)
