@echo off
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
    echo npm not found in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Installing dependencies...
npm install
if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
)

echo Starting Vite dev server...
npm run dev
