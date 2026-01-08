#!/bin/bash

echo "========================================"
echo "  Installation Checker for Mac"
echo "========================================"
echo ""

echo "[*] Checking debug mode settings..."
echo ""

for version in 9 10 11 12; do
    result=$(defaults read com.adobe.CSXS.$version PlayerDebugMode 2>/dev/null)
    if [ "$result" == "1" ]; then
        echo "[OK] CSXS.$version - Debug mode enabled"
    else
        echo "[!] CSXS.$version - Debug mode NOT enabled"
    fi
done

echo ""
echo "========================================"
echo ""

echo "[*] Checking file structure..."

if [ -f "index.html" ]; then
    echo "[OK] index.html found"
else
    echo "[!] index.html MISSING!"
fi

if [ -f "CSInterface.js" ]; then
    echo "[OK] CSInterface.js found"
else
    echo "[!] CSInterface.js MISSING!"
fi

if [ -f ".debug" ]; then
    echo "[OK] .debug file found"
else
    echo "[!] .debug file MISSING!"
fi

if [ -f "CEPEXT/manifest.xml" ]; then
    echo "[OK] manifest.xml found"
else
    echo "[!] manifest.xml MISSING!"
fi

if [ -f "js/main.js" ]; then
    echo "[OK] main.js found"
else
    echo "[!] main.js MISSING!"
fi

echo ""
echo "========================================"
echo ""

echo "[*] Checking if After Effects is running..."
if pgrep -x "After Effects" > /dev/null; then
    echo "[!] After Effects IS RUNNING"
    echo "[!] QUIT IT and restart for changes to take effect!"
else
    echo "[OK] After Effects is not running"
fi

echo ""
echo "========================================"
echo "  Installation Check Complete"
echo "========================================"
echo ""

echo "Next steps:"
echo "1. If any files are MISSING, re-extract the ZIP"
echo "2. If debug mode NOT enabled, run: ./enable-debug-mode.sh"
echo "3. Quit After Effects completely"
echo "4. Restart After Effects"
echo "5. Go to Window -> Extensions -> Pulse GIF Preview (Legacy)"
echo ""
