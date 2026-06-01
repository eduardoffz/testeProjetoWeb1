#!/bin/bash

echo "=================================="
echo "  DevFreela - Startup Script"
echo "=================================="

start_backend() {
  echo "[BACKEND] Starting Spring Boot..."
  cd backend
  mvn spring-boot:run &
  BACKEND_PID=$!
  cd ..
  echo "[BACKEND] PID: $BACKEND_PID"
}

start_frontend() {
  echo "[FRONTEND] Installing dependencies..."
  cd frontend
  npm install
  echo "[FRONTEND] Starting React..."
  npm start &
  FRONTEND_PID=$!
  cd ..
  echo "[FRONTEND] PID: $FRONTEND_PID"
}

case "${1:-all}" in
  backend)
    start_backend
    wait $BACKEND_PID
    ;;
  frontend)
    start_frontend
    wait $FRONTEND_PID
    ;;
  all|*)
    start_backend
    sleep 5
    start_frontend
    echo ""
    echo "=================================="
    echo "  Backend:  http://localhost:8080"
    echo "  Frontend: http://localhost:3000"
    echo "  H2 Console: http://localhost:8080/h2-console"
    echo "=================================="
    echo ""
    wait
    ;;
esac
