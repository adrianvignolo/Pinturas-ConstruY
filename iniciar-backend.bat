@echo off
title Backend Materiales ConstruY - MariaDB 3307
cd /d "%~dp0backend"
echo ===================================================
echo Iniciando Backend FastAPI (MariaDB puerto 3307)...
echo URL: http://localhost:8002
echo Docs Swagger: http://localhost:8002/docs
echo ===================================================
call .venv\Scripts\activate
python run.py
pause
