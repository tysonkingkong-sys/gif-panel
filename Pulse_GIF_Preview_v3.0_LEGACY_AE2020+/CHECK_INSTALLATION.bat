@echo off
echo ========================================
echo   Installation Checker for Windows
echo ========================================
echo.

echo [*] Checking debug mode settings...
echo.

reg query "HKEY_CURRENT_USER\Software\Adobe\CSXS.9" /v PlayerDebugMode 2>nul
if %errorlevel%==0 (
    echo [OK] CSXS.9 found
) else (
    echo [!] CSXS.9 NOT found - Run enable-debug-mode.bat!
)

echo.
reg query "HKEY_CURRENT_USER\Software\Adobe\CSXS.10" /v PlayerDebugMode 2>nul
if %errorlevel%==0 (
    echo [OK] CSXS.10 found
) else (
    echo [!] CSXS.10 NOT found
)

echo.
reg query "HKEY_CURRENT_USER\Software\Adobe\CSXS.11" /v PlayerDebugMode 2>nul
if %errorlevel%==0 (
    echo [OK] CSXS.11 found
) else (
    echo [!] CSXS.11 NOT found
)

echo.
reg query "HKEY_CURRENT_USER\Software\Adobe\CSXS.12" /v PlayerDebugMode 2>nul
if %errorlevel%==0 (
    echo [OK] CSXS.12 found
) else (
    echo [!] CSXS.12 NOT found
)

echo.
echo ========================================
echo.

echo [*] Checking file structure...
if exist "index.html" (
    echo [OK] index.html found
) else (
    echo [!] index.html MISSING!
)

if exist "CSInterface.js" (
    echo [OK] CSInterface.js found
) else (
    echo [!] CSInterface.js MISSING!
)

if exist ".debug" (
    echo [OK] .debug file found
) else (
    echo [!] .debug file MISSING!
)

if exist "CEPEXT\manifest.xml" (
    echo [OK] manifest.xml found
) else (
    echo [!] manifest.xml MISSING!
)

if exist "js\main.js" (
    echo [OK] main.js found
) else (
    echo [!] main.js MISSING!
)

echo.
echo ========================================
echo.

echo [*] Checking if After Effects is running...
tasklist /FI "IMAGENAME eq AfterFX.exe" 2>NUL | find /I /N "AfterFX.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [!] After Effects IS RUNNING
    echo [!] CLOSE IT and restart for changes to take effect!
) else (
    echo [OK] After Effects is not running
)

echo.
echo ========================================
echo   Installation Check Complete
echo ========================================
echo.

echo Next steps:
echo 1. If any files are MISSING, re-extract the ZIP
echo 2. If debug mode NOT found, run enable-debug-mode.bat
echo 3. Close After Effects completely
echo 4. Restart After Effects
echo 5. Go to Window -^> Extensions -^> Pulse GIF Preview (Legacy)
echo.

pause
