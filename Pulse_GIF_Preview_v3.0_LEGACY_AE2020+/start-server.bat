@echo off
echo ================================
echo   GIF Preview - Local Server
echo ================================
echo.

REM Check if CSInterface.js exists and is not the placeholder
findstr /C:"PLACEHOLDER FILE" CSInterface.js >nul 2>&1
if %errorlevel%==0 (
    echo [!] WARNING: CSInterface.js is still a placeholder!
    echo [!] Download the real file from:
    echo [!] https://raw.githubusercontent.com/Adobe-CEP/CEP-Resources/master/CEP_11.x/CSInterface.js
    echo.
    pause
)

echo [*] Starting server on http://localhost:8000
echo [*] Press Ctrl+C to stop the server
echo.
echo [*] Open your browser to: http://localhost:8000
echo.

REM Try Python 3 first, then Python 2
python --version >nul 2>&1
if %errorlevel%==0 (
    python server.py
) else (
    python3 server.py
)

pause
