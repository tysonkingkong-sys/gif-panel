#!/usr/bin/env python3
"""
Development HTTP Server with correct MIME types for CEP extensions
Run this script to test your extension locally before deploying to Adobe.

Features:
- Correct Content-Type headers for JavaScript files
- CORS headers for local development
- Request logging for debugging
- Proper MIME types for various file types
"""

import http.server
import socketserver
import os
import sys
from datetime import datetime

PORT = 8000

class CEPHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP handler with proper MIME types for CEP development"""
    
    # Extended MIME types for CEP extensions
    extensions_map = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript; charset=utf-8',
        '.mjs': 'text/javascript; charset=utf-8',
        '.json': 'application/json',
        '.xml': 'application/xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.mov': 'video/quicktime',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject',
    }
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Prevent caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        super().end_headers()
    
    def guess_type(self, path):
        """Override to use our custom MIME types"""
        base, ext = os.path.splitext(path)
        if ext in self.extensions_map:
            return self.extensions_map[ext]
        return super().guess_type(path)
    
    def log_message(self, format, *args):
        """Custom logging with timestamp and color coding"""
        timestamp = datetime.now().strftime('%H:%M:%S')
        status_code = args[1] if len(args) > 1 else '000'
        
        # Color code based on status
        if status_code.startswith('2'):
            status_icon = '✅'
        elif status_code.startswith('3'):
            status_icon = '↩️ '
        elif status_code.startswith('4'):
            status_icon = '⚠️ '
        elif status_code.startswith('5'):
            status_icon = '❌'
        else:
            status_icon = '📄'
        
        sys.stderr.write(f"[{timestamp}] {status_icon} {format % args}\n")

def main():
    """Start the development server"""
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("=" * 60)
    print("🚀 CEP Extension Development Server")
    print("=" * 60)
    print(f"✅ Server started at http://localhost:{PORT}")
    print(f"📁 Serving files from: {os.getcwd()}")
    print()
    print("🌐 Access URLs:")
    print(f"   - Extension UI:  http://localhost:{PORT}")
    print(f"   - Debug info:    http://localhost:{PORT}/.debug")
    print(f"   - Manifest:      http://localhost:{PORT}/CSXS/manifest.xml")
    print()
    print("🐛 Debug Features:")
    print("   - Proper JavaScript MIME types (text/javascript)")
    print("   - CORS headers enabled")
    print("   - Cache disabled for development")
    print("   - Request logging enabled")
    print()
    print("💡 Debugging Tips:")
    print("   1. Open http://localhost:{PORT} in Chrome")
    print("   2. Press F12 to open DevTools")
    print("   3. Check Network tab for MIME types")
    print("   4. Check Console tab for errors")
    print()
    print("⌨️  Press Ctrl+C to stop the server")
    print("=" * 60)
    print()
    
    try:
        with socketserver.TCPServer(("", PORT), CEPHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n" + "=" * 60)
        print("👋 Server stopped gracefully")
        print("=" * 60)
    except OSError as e:
        if e.errno == 48 or e.errno == 98:  # Address already in use
            print("\n" + "=" * 60)
            print(f"❌ ERROR: Port {PORT} is already in use")
            print("=" * 60)
            print("\n💡 Solutions:")
            print(f"   1. Stop the process using port {PORT}")
            print(f"   2. Edit PORT variable in {__file__}")
            print(f"   3. Wait a few seconds and try again")
            sys.exit(1)
        else:
            raise

if __name__ == "__main__":
    main()
