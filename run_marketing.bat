@echo off
title AJ Ghost - Marketing & AI Automation Engine
cd /d "%~dp0"
echo =====================================================================
echo  Starting AJ Ghost Marketing Engine (GenSpark AI + MailerLite)
echo =====================================================================
"%LOCALAPPDATA%\Programs\Python\Python312\python.exe" -m marketing_system.cli
if errorlevel 1 (
    python -m marketing_system.cli
)
pause
