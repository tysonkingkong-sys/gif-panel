# 🚀 Quick Installation & Debugging Reference

## Installation (5 Minutes)

### Step 1: Copy Extension Folder

**Windows:**
```batch
Copy "Pulse_GIF_Preview_v3.0_LEGACY_AE2020+" to:
C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\extensions\
```

**Mac:**
```bash
cp -r Pulse_GIF_Preview_v3.0_LEGACY_AE2020+ ~/Library/Application\ Support/Adobe/CEP/extensions/
```

### Step 2: Enable Debug Mode

**Windows (Run as Administrator):**
```batch
cd Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
enable-debug-mode.bat
```

**Mac:**
```bash
cd Pulse_GIF_Preview_v3.0_LEGACY_AE2020+
./enable-debug-mode.sh
```

### Step 3: Verify Installation

**Windows:**
```batch
CHECK_INSTALLATION.bat
```

**Mac:**
```bash
./check-installation.sh
```

### Step 4: Restart After Effects

1. **Quit** After Effects completely
2. **Restart** After Effects
3. **Window → Extensions → Pulse GIF Preview (Legacy)**

---

## Debugging (Quick Reference)

### Remote Debugging (Chrome DevTools)

```
1. Open extension in After Effects
2. Open Chrome: http://localhost:8092
3. Debug with full Chrome DevTools
```

**Port:** 8092 (configured in `.debug` file)

### Local Testing (Browser)

```bash
# Start development server
python3 server.py

# Open in browser
http://localhost:8000
```

**Features:**
- ✅ Correct MIME types (text/javascript)
- ✅ CORS headers enabled
- ✅ No caching (dev mode)
- ✅ Request logging

### Check Debug Mode Status

**Windows (PowerShell):**
```powershell
Get-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.9" -Name PlayerDebugMode
Get-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.10" -Name PlayerDebugMode
Get-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.11" -Name PlayerDebugMode
Get-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.12" -Name PlayerDebugMode
```

**Mac:**
```bash
defaults read com.adobe.CSXS.9 PlayerDebugMode
defaults read com.adobe.CSXS.10 PlayerDebugMode
defaults read com.adobe.CSXS.11 PlayerDebugMode
defaults read com.adobe.CSXS.12 PlayerDebugMode
```

Should return: `1`

---

## Troubleshooting

### Extension Not Showing Up?

1. ✅ Debug mode enabled? Run `enable-debug-mode.bat/sh` again
2. ✅ In correct folder? Check extensions directory
3. ✅ AE fully restarted? Quit completely and restart
4. ✅ Correct AE version? AE 2020+ required

### JavaScript Errors?

1. Connect DevTools: `http://localhost:8092`
2. Check Console tab
3. Check Network tab for failed requests
4. Verify MIME types are correct

### MIME Type Errors?

```bash
# Use the development server
python3 server.py

# Verify in Chrome DevTools:
# Network tab → Click .js file → Response Headers
# Should show: Content-Type: text/javascript; charset=utf-8
```

---

## Key Files

| File | Purpose |
|------|---------|
| `.debug` | Debug port configuration (8092) |
| `CSXS/manifest.xml` | CEP extension configuration |
| `server.py` | Development server with MIME types |
| `enable-debug-mode.bat/sh` | Enable CEP debug mode |
| `check-installation.bat/sh` | Verify installation |

---

## Quick Commands

```bash
# Enable debug mode
./enable-debug-mode.sh

# Check installation
./check-installation.sh

# Start dev server
python3 server.py

# Make scripts executable (Mac)
chmod +x *.sh
```

---

## Debug URLs

| URL | Purpose |
|-----|---------|
| http://localhost:8092 | Remote debugging (Chrome DevTools) |
| http://localhost:8000 | Local testing server |
| http://localhost:8000/.debug | Debug configuration |
| http://localhost:8000/CSXS/manifest.xml | Extension manifest |

---

## After Effects Versions

| AE Version | CEP Version | Compatible? |
|------------|-------------|-------------|
| 2020 (17.x) | CEP 9.x | ✅ Yes |
| 2021 (18.x) | CEP 10.x | ✅ Yes |
| 2022 (19.x) | CEP 11.x | ✅ Yes |
| 2023 (23.x) | CEP 11.x | ✅ Yes |
| 2024 (24.x) | CEP 12.x | ✅ Yes |

---

## Common Console Commands

```javascript
// In Chrome DevTools (http://localhost:8092)

// Check CEP version
var cs = new CSInterface();
console.log(cs.getHostEnvironment());

// Check extension ID
console.log(cs.getExtensionID());

// Reload extension
location.reload();

// Check all scripts loaded
console.log(document.scripts);
```

---

## Documentation

- `README.md` - Main documentation
- `DEBUGGING.md` - Comprehensive debugging guide
- `ERRORS_EXPLAINED.md` - Error messages and solutions
- `TROUBLESHOOTING_NOT_SHOWING_UP.md` - Installation issues
- `AE2020_COMPATIBLE.md` - Compatibility details

---

## Support

**Discord:** @inyourrealm

**Issues to report:**
1. After Effects version
2. Extension version (LEGACY)
3. Error messages from Console
4. Screenshots of issue
5. Debug mode status
