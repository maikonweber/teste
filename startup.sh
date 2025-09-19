#!/bin/bash
set -e  # se algum comando falhar, interrompe o script

echo "📦 Subindo containers com Docker..."
docker-compose up -d

echo "🚀 Iniciando backend (tessract_server)..."
pushd tessarct_server > /dev/null
npm install
npm run start:dev &
BACK_PID=$!
popd > /dev/null

echo "💻 Iniciando frontend (my_next-app)..."
pushd my_next-app > /dev/null
npm install
npm run dev &
FRONT_PID=$!
popd > /dev/null

echo "✅ Todos os serviços foram iniciados!"
echo "   Backend rodando no PID: $BACK_PID"
echo "   Frontend rodando no PID: $FRONT_PID"

# Mantém script vivo até receber Ctrl+C
wait
