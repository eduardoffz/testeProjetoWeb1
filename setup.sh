#!/bin/bash

echo "=================================="
echo "  DevFreela - Setup Completo"
echo "=================================="

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Verifica Java
if command -v java &> /dev/null; then
    echo -e "${GREEN}[OK]${NC} Java instalado: $(java -version 2>&1 | head -n 1)"
else
    echo -e "${RED}[ERRO]${NC} Java nao encontrado. Instale o JDK 17+."
    exit 1
fi

# Verifica Node
if command -v node &> /dev/null; then
    echo -e "${GREEN}[OK]${NC} Node instalado: $(node --version)"
else
    echo -e "${RED}[ERRO]${NC} Node nao encontrado. Instale o Node.js 18+."
    exit 1
fi

# Verifica Maven
if command -v mvn &> /dev/null; then
    echo -e "${GREEN}[OK]${NC} Maven instalado: $(mvn --version 2>&1 | head -n 1)"
else
    echo -e "${RED}[ERRO]${NC} Maven nao encontrado."
    exit 1
fi

echo ""
echo "=================================="
echo " 1. Instalando dependencias do Frontend"
echo "=================================="
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERRO]${NC} Falha ao instalar dependencias do frontend"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} Dependencias do frontend instaladas"
cd ..

echo ""
echo "=================================="
echo " 2. Compilando o Backend"
echo "=================================="
cd backend
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERRO]${NC} Falha ao compilar o backend"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} Backend compilado"
cd ..

echo ""
echo "=================================="
echo " 3. Iniciando o Banco H2 + Backend"
echo "=================================="
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}[OK]${NC} Backend iniciando (PID: $BACKEND_PID)..."
sleep 8

echo ""
echo "=================================="
echo " 4. Iniciando o Frontend"
echo "=================================="
cd frontend
BROWSER=none npm start &
FRONTEND_PID=$!
cd ..
echo -e "${GREEN}[OK]${NC} Frontend iniciando (PID: $FRONTEND_PID)..."

echo ""
echo "=================================="
echo -e "${GREEN}  DevFreela rodando!${NC}"
echo "=================================="
echo ""
echo "  Backend:  http://localhost:8080"
echo "  Frontend: http://localhost:3000"
echo "  H2 Console: http://localhost:8080/h2-console"
echo "    (JDBC: jdbc:h2:mem:devfreela | User: sa | Senha: vazio)"
echo ""
echo "  Credenciais de teste:"
echo "    Freelancer: ana@email.com / 123456"
echo "    Cliente:    contato@techcorp.com / 123456"
echo "    Admin:      admin@devfreela.com / 123456"
echo ""
echo "  Pressione Ctrl+C para parar tudo"
echo "=================================="

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Servicos parados.'; exit 0" SIGINT SIGTERM
wait
