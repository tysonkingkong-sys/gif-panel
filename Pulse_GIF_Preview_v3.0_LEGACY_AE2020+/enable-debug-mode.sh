#!/bin/bash

echo "========================================"
echo "  Adobe CEP Debug Mode Enabler"
echo "  For After Effects 2020-2024"
echo "========================================"
echo ""
echo "This script will enable debug mode for Adobe CEP extensions"
echo ""

# Enable for CSXS.9 (After Effects 2020)
echo "[*] Enabling PlayerDebugMode for CSXS.9 (AE 2020)..."
defaults write com.adobe.CSXS.9 PlayerDebugMode 1
if [ $? -eq 0 ]; then
    echo "[✓] CSXS.9 PlayerDebugMode enabled"
else
    echo "[!] Failed to enable CSXS.9"
fi

echo ""

# Enable for CSXS.10 (After Effects 2021)
echo "[*] Enabling PlayerDebugMode for CSXS.10 (AE 2021)..."
defaults write com.adobe.CSXS.10 PlayerDebugMode 1
if [ $? -eq 0 ]; then
    echo "[✓] CSXS.10 PlayerDebugMode enabled"
else
    echo "[!] Failed to enable CSXS.10"
fi

echo ""

# Enable for CSXS.11 (After Effects 2022-2023)
echo "[*] Enabling PlayerDebugMode for CSXS.11 (AE 2022-2023)..."
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
if [ $? -eq 0 ]; then
    echo "[✓] CSXS.11 PlayerDebugMode enabled"
else
    echo "[!] Failed to enable CSXS.11"
fi

echo ""

# Enable for CSXS.12 (After Effects 2024)
echo "[*] Enabling PlayerDebugMode for CSXS.12 (AE 2024)..."
defaults write com.adobe.CSXS.12 PlayerDebugMode 1
if [ $? -eq 0 ]; then
    echo "[✓] CSXS.12 PlayerDebugMode enabled"
else
    echo "[!] Failed to enable CSXS.12"
fi

echo ""
echo "========================================"
echo "  DONE!"
echo "========================================"
echo ""
echo "Debug mode has been enabled for AE 2020-2024."
echo "Restart After Effects for changes to take effect."
echo ""
echo "Your extensions folder is located at:"
echo "~/Library/Application Support/Adobe/CEP/extensions/"
echo ""
echo "To verify settings:"
echo "  defaults read com.adobe.CSXS.9 PlayerDebugMode"
echo "  defaults read com.adobe.CSXS.10 PlayerDebugMode"
echo "  defaults read com.adobe.CSXS.11 PlayerDebugMode"
echo "  defaults read com.adobe.CSXS.12 PlayerDebugMode"
echo ""
