# Pulse GIF Preview - CEP Extension for After Effects 2020+

A powerful GIF and media preview extension for Adobe After Effects 2020 and later versions.

## 🎯 Quick Start

This repository contains a CEP (Common Extensibility Platform) extension that enables debugging and preview capabilities for After Effects 2020+.

### Prerequisites
- Adobe After Effects 2020 or later
- Python 3.x (for local testing server)
- Administrator/root access (for enabling debug mode)

## 📁 Repository Structure

```
gif-panel/
├── Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/    # Main extension folder
│   ├── .debug                                 # Debug configuration (Port 8092)
│   ├── CSXS/
│   │   └── manifest.xml                       # CEP manifest configuration
│   ├── index.html                             # Main extension UI
│   ├── CSInterface.js                         # Adobe CEP API library
│   ├── server.py                              # Local development server with MIME types
│   ├── enable-debug-mode.bat                  # Windows debug mode enabler
│   ├── enable-debug-mode.sh                   # Mac/Linux debug mode enabler
│   ├── js/                                    # JavaScript source files
│   ├── assets/                                # Image assets
│   └── Documentation files (.md)
└── README.md                                  # This file
```

## 🔧 Installation & Debugging Setup

### Step 1: Enable CEP Debug Mode

**CRITICAL:** This must be done before the extension will work!

#### Windows
1. Right-click `Pulse_GIF_Preview_v3.0_LEGACY_AE2020+/enable-debug-mode.bat`
2. Select **"Run as Administrator"**
3. Verify you see success messages for CSXS.9, CSXS.10, CSXS.11, and CSXS.12

#### Mac/Linux
```bash
cd Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
chmod +x enable-debug-mode.sh
./enable-debug-mode.sh
```

### Step 2: Install Extension

Copy the `Pulse_GIF_Preview_v3.0_LEGACY_AE2020+` folder to your CEP extensions directory:

#### Windows
```
C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\extensions\
```

#### Mac
```
~/Library/Application Support/Adobe/CEP/extensions/
```

### Step 3: Restart After Effects

1. Completely quit After Effects
2. Wait a few seconds
3. Restart After Effects
4. Go to **Window → Extensions → Pulse GIF Preview (Legacy)**

## 🐛 Debugging the Extension

### Remote Debugging with Chrome DevTools

The extension includes a `.debug` file configured for remote debugging on **port 8092**.

1. Ensure debug mode is enabled (Step 1 above)
2. Open After Effects with the extension loaded
3. Open Chrome and navigate to: `http://localhost:8092`
4. You'll see Chrome DevTools connected to the CEP extension
5. You can now debug JavaScript, inspect DOM, check network requests, etc.

### Local Development Server (MIME Type Testing)

For testing the extension outside of After Effects or troubleshooting MIME type issues:

```bash
cd Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
python3 server.py
# or on Windows:
python server.py
```

Then open `http://localhost:8000` in your browser.

**Why use the server?**
- Proper `Content-Type: text/javascript` MIME headers for JS files
- CORS headers for local development
- Simulates the CEP environment for testing

### Debugging Configuration Details

#### `.debug` File
```xml
<Extension Id="com.pulse.gifpreview.legacy.panel">
  <HostList>
    <Host Name="AEFT" Port="8092"/>
  </HostList>
</Extension>
```
- **Port 8092**: Remote debugging port
- **Host Name AEFT**: After Effects identifier

#### Manifest.xml Configuration
- **Version**: 5.0 (ExtensionManifest schema)
- **Required Runtime**: CSXS 6.0 (backward compatible)
- **Host Version**: [17.0, 99.9] (AE 2020 to future versions)
- **CEF Parameters**: 
  - `--enable-nodejs`: Enable Node.js integration
  - `--allow-file-access-from-files`: Allow local file access
  - `--allow-file-access`: File system access
  - `--mixed-context`: Mixed context support

## 📚 Documentation

The extension includes comprehensive documentation:

- **README.md** (this file) - Main documentation and debugging guide
- **QUICK_START.md** - Quick installation guide
- **AE2020_COMPATIBLE.md** - After Effects 2020 compatibility details
- **ERRORS_EXPLAINED.md** - Common error messages and solutions
- **TROUBLESHOOTING_NOT_SHOWING_UP.md** - Extension visibility troubleshooting
- **WHAT_WAS_FIXED.md** - History of fixes and changes

## 🔍 Common Issues

### Extension Not Showing Up?
1. Verify debug mode is enabled (run the script again)
2. Check the extension is in the correct folder
3. Fully restart After Effects (quit completely)
4. See `TROUBLESHOOTING_NOT_SHOWING_UP.md` for detailed steps

### MIME Type Errors?
- Use the included `server.py` for local testing
- The server sets proper `Content-Type: text/javascript` headers
- See `ERRORS_EXPLAINED.md` for details

### JavaScript Errors?
1. Enable remote debugging (port 8092)
2. Open Chrome DevTools: `http://localhost:8092`
3. Check Console tab for error messages
4. Verify all JS files are loading correctly

## 🛠️ Development

### File Structure
- Traditional `<script>` tags (no ES6 modules for CEP 9.x compatibility)
- Scripts loaded in dependency order in `index.html`
- Global functions (no module imports/exports)
- Compatible with Chrome 74 (CEP 9.x)

### Testing Workflow
1. Make changes to files
2. Test locally: `python3 server.py` → `http://localhost:8000`
3. Test in AE: Copy to extensions folder → Restart AE
4. Debug: Chrome DevTools → `http://localhost:8092`

## 📋 Requirements

### After Effects Compatibility
- After Effects 2020 (v17.x) - CEP 9.x
- After Effects 2021 (v18.x) - CEP 10.x  
- After Effects 2022+ (v19.x+) - CEP 11.x/12.x

### Browser/CEP Features
- Based on Chromium/CEF (Chrome Embedded Framework)
- CEP 9.x uses Chrome 74
- JavaScript features: ES6 (limited), no ES6 modules
- IndexedDB, LocalStorage, Canvas APIs supported

## 🎬 Features

- 📸 Preview GIFs, images, and videos
- 🔍 Zoom, pan, and fit controls
- 🎵 Video playback with volume control
- 📜 History of recent media files
- 🎨 Multiple theme options
- 💾 IndexedDB storage for large files
- 🖥️ Remote debugging support

## 📄 License

This tool is provided "as-is", without warranty of any kind.

You may use, modify, and distribute this script for personal or commercial projects, provided credit is given to the original authors.

Redistribution of paid versions or claiming ownership of the original code is not permitted.

## 👥 Authors

- **Tom** - Original Author
- **Jay** - Co-Author

## 💬 Support

For bugs, crashes, or errors, contact: `@inyourrealm` on Discord

---

**Version:** 3.0  
**Type:** Adobe CEP Extension  
**Tested On:** After Effects 2020-2024
