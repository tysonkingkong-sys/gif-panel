@echo off
echo ========================================
echo   Adobe CEP Debug Mode Enabler
echo   For After Effects 2020-2024
echo ========================================
echo.
echo This script will enable debug mode for Adobe CEP extensions
echo.

REM Try CSXS.9 (After Effects 2020)
echo [*] Enabling PlayerDebugMode for CSXS.9 (AE 2020)...
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.9" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
if %errorlevel%==0 (
    echo [OK] CSXS.9 PlayerDebugMode enabled
) else (
    echo [!] Failed to enable CSXS.9
)

echo.

REM Try CSXS.10 (After Effects 2021)
echo [*] Enabling PlayerDebugMode for CSXS.10 (AE 2021)...
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.10" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
if %errorlevel%==0 (
    echo [OK] CSXS.10 PlayerDebugMode enabled
) else (
    echo [!] Failed to enable CSXS.10
)

echo.

REM Try CSXS.11 (After Effects 2022-2023)
echo [*] Enabling PlayerDebugMode for CSXS.11 (AE 2022-2023)...
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.11" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
if %errorlevel%==0 (
    echo [OK] CSXS.11 PlayerDebugMode enabled
) else (
    echo [!] Failed to enable CSXS.11
)

echo.

REM Try CSXS.12 (After Effects 2024)
echo [*] Enabling PlayerDebugMode for CSXS.12 (AE 2024)...
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.12" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
if %errorlevel%==0 (
    echo [OK] CSXS.12 PlayerDebugMode enabled
) else (
    echo [!] Failed to enable CSXS.12
)

echo.
echo ========================================
echo   DONE!
echo ========================================
echo.
echo Debug mode has been enabled for AE 2020-2024.
echo Restart After Effects for changes to take effect.
echo.
echo Your extensions folder is located at:
echo %appdata%\Adobe\CEP\extensions\
echo.

pause
