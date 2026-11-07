@echo off
title Sistema Completo Materiales ConstruY
echo ===================================================
echo Levantando Sistema Pinturas ConstruY
echo Frontend: React + Vite + Tailwind (http://localhost:5174)
echo Backend: Python FastAPI (http://localhost:8002)
echo Base de Datos: MariaDB en puerto 3307
echo ===================================================
start "Backend FastAPI (Puerto 8002)" cmd /c "iniciar-backend.bat"
start "Frontend Vite React (Puerto 5174)" cmd /c "iniciar-frontend.bat"
echo Servidores iniciados en ventanas independientes.
