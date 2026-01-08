#!/bin/bash

echo "================================"
echo "  GIF Preview - Local Server"
echo "================================"
echo ""

# Check if CSInterface.js is still a placeholder
if grep -q "PLACEHOLDER FILE" CSInterface.js 2>/dev/null; then
    echo "⚠️  WARNING: CSInterface.js is still a placeholder!"
    echo "📥 Download the real file from:"
    echo "   https://raw.githubusercontent.com/Adobe-CEP/CEP-Resources/master/CEP_11.x/CSInterface.js"
    echo ""
    read -p "Press Enter to continue anyway, or Ctrl+C to exit..."
fi

echo "🚀 Starting server on http://localhost:8000"
echo "⌨️  Press Ctrl+C to stop the server"
echo ""
echo "🌐 Open your browser to: http://localhost:8000"
echo ""

# Try Python 3 first, then Python 2
if command -v python3 &>/dev/null; then
    python3 server.py
elif command -v python &>/dev/null; then
    python server.py
else
    echo "❌ Error: Python is not installed!"
    echo "📦 Install Python from: https://www.python.org/downloads/"
    exit 1
fi
