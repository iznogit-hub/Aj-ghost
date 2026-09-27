@echo off
title AJ Ghost - Marketing & AI Automation Engine
cd /d "%~dp0"
echo =====================================================================
echo  Starting AJ Ghost Marketing Engine (GenSpark AI + MailerLite)
echo =====================================================================
if exist ".venv\Scripts\python.exe" (
    ".venv\Scripts\python.exe" -m marketing_system.cli
) else if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" -m marketing_system.cli
) else (
    python -m marketing_system.cli
)
pause
